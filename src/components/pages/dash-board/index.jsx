import React, { useEffect, useState } from "react";
import { Box, Divider, Heading } from "@chakra-ui/react";
import { Table } from "react-chakra-pagination";

import { fetchCitizens } from "../../../services/firebase";
import {
  PRIMARY_COLOR,
  tableColumns,
  TITLE_INFO_COLOR,
  BOX_BORDER_COLOR,
} from "../../../configs";
import { getTableData } from "../../../utils";
import { FiUser } from "react-icons/fi";

const DashBoard = () => {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const initialization = async () => {
      const citizens = await fetchCitizens();
      setTableData(getTableData(citizens));
    };
    initialization();
  }, []);

  return (
    <Box>
      {tableData.length !== 0 && (
        <Box>
          <Heading mt={5} color={TITLE_INFO_COLOR}>
            Citizen Table
          </Heading>
          <Divider my={5} color={BOX_BORDER_COLOR} />
          <Table
            colorScheme={PRIMARY_COLOR}
            height="300px"
            columns={tableColumns}
            data={tableData}
            totalRegisters={tableData.length}
            page={page}
            emptyData={{
              icon: FiUser,
              text: "Nobody is registered here.",
            }}
            onPageChange={(page) => setPage(page)}
          />
        </Box>
      )}
    </Box>
  );
};

export default DashBoard;
