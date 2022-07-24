import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Heading,
  Flex,
  InputGroup,
  InputRightElement,
  Icon,
  Input,
} from "@chakra-ui/react";
import { Table } from "react-chakra-pagination";
import { AiOutlineInbox } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import CustomSpinner from "../../commons/CustomSpinner";
import {
  fetchCitizens,
  fetchCitizensByIdOrName,
} from "../../../services/firebase";
import {
  PRIMARY_COLOR,
  tableColumns,
  TITLE_INFO_COLOR,
  BOX_BORDER_COLOR,
} from "../../../configs";
import { getTableData } from "../../../utils";
import { useModal } from "../../../contexts/modal-context";
import useToastCustom from "../../../hooks/useToast";
import { deleteCitizen } from "../../../services/firebase";

const DashBoard = () => {
  const navigate = useNavigate();
  const { openModal, onClose, setIsActionLoading } = useModal();
  const toast = useToastCustom();

  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (searchTerm === "") {
      fetchAll();
      return;
    }
    const timerId = setTimeout(fetchWithSearchTerm, 1000);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  const fetchAll = async () => {
    setIsLoading(true);
    const citizens = await fetchCitizens();
    setTableData(getTableData(citizens, handleDelete, handleNavigate));
    setIsLoading(false);
  };

  const fetchWithSearchTerm = async () => {
    setIsLoading(true);
    const citizens = await fetchCitizensByIdOrName(searchTerm);
    setTableData(getTableData(citizens));
    setIsLoading(false);
  };

  const reloadTable = () => {
    if (searchTerm === "") {
      fetchAll();
      return;
    }
    fetchWithSearchTerm();
  };

  const handleTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleNavigate = (citizenId) => {
    navigate(`/editCitizen/${citizenId}`);
  };

  const handleDelete = (citizenId, citizenIdNumber) => {
    openModal({
      header: "Delete citizen",
      body: `Are you sure to delete citizen with id number ${citizenIdNumber}?`,
      actionFunc: async () => {
        setIsActionLoading(true);
        try {
          await deleteCitizen(citizenId);
          toast({
            title: "Deleted successfully",
            description: "Citizen has been deleted",
          });
          reloadTable();
        } catch (e) {
          toast({
            title: "Deleted failed",
            description: "Failed to delete citizen",
          });
        } finally {
          setIsActionLoading(false);
          onClose();
        }
      },
    });
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <Flex h="30vh" w="100%" justify="center" align="center">
          <CustomSpinner />
        </Flex>
      );
    }
    return (
      <Table
        colorScheme={PRIMARY_COLOR}
        height="300px"
        columns={tableColumns}
        data={tableData}
        totalRegisters={tableData.length}
        page={page}
        emptyData={{
          icon: AiOutlineInbox,
          text: "No result found",
        }}
        onPageChange={(page) => setPage(page)}
      />
    );
  };

  return (
    <Box w="100%">
      <Box>
        <Flex py={5} px={10} justify="space-between" align="center">
          <Heading color={TITLE_INFO_COLOR}>Citizen Table</Heading>
          <InputGroup w="20%">
            <Input
              placeholder="Search by name or id"
              value={searchTerm}
              onChange={handleTermChange}
            />
            <InputRightElement
              pointerEvents="none"
              children={<Icon color={PRIMARY_COLOR} as={BsSearch} />}
            />
          </InputGroup>
        </Flex>
        <Divider mb={5} color={BOX_BORDER_COLOR} />
        {renderContent()}
      </Box>
    </Box>
  );
};

export default DashBoard;
