import React, { useEffect, useState } from "react";
import { Flex, Box, Heading } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "react-chakra-pagination";

import { useModal } from "../../../contexts/modal-context";
import useToastCustom from "../../../hooks/useToast";
import {
  fetchVaccineByNameOrCode,
  fetchVaccines,
} from "../../../services/firebase";
import { paths, PRIMARY_COLOR } from "../../../configs";
import { getVaccineTableData } from "../../../utils";
import CustomSpinner from "../../commons/CustomSpinner";
import { vaccinationTableColumns } from "../../../configs/vaccinationTable";
import { AiOutlineInbox } from "react-icons/ai";

const ManageVaccination = () => {
  const navigate = useNavigate();
  const toast = useToastCustom();

  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);

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
    const vaccinations = await fetchVaccines();
    setTableData(getVaccineTableData(vaccinations, handleNavigate));
    setIsLoading(false);
  };

  const handleNavigate = (pathName, vaccineId) => {
    navigate(`${paths[pathName].pathWithNoParams}/${vaccineId}`);
  };

  const fetchWithSearchTerm = async () => {
    setIsLoading(true);
    const vaccinations = await fetchVaccineByNameOrCode(searchTerm);
    setTableData(getVaccineTableData(vaccinations, handleNavigate));
    setIsLoading(false);
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
        columns={vaccinationTableColumns}
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

  return <Box>{renderContent()}</Box>;
};

export default ManageVaccination;
