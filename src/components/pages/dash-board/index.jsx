import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { Table } from "react-chakra-pagination";

import { db } from "../../../firebase";
import { PRIMARY_COLOR } from "../../../configs";

const DashBoard = () => {
  const [page, setPage] = useState(1);

  const getData = async () => {
    const profileCollectionRef = collection(db, "hello");
    getDocs(profileCollectionRef)
      .then((rs) => console.log(rs.docs))
      .catch((e) => console.log(e));
  };

  // const getData = () => {
  //   console.log(import.meta.env.VITE_API_KEY);
  //   console.log("Hello World");
  // };

  const users = [
    {
      firstName: "Bao",
      lastName: "Pham Gia",
    },
    {
      firstName: "Minh",
      lastName: "Nguyen Quy",
    },
    {
      firstName: "Bao",
      lastName: "Pham Gia",
    },
    {
      firstName: "Minh",
      lastName: "Nguyen Quy",
    },
    {
      firstName: "Bao",
      lastName: "Pham Gia",
    },
    {
      firstName: "Minh",
      lastName: "Nguyen Quy",
    },
    {
      firstName: "Bao",
      lastName: "Pham Gia",
    },
    {
      firstName: "Minh",
      lastName: "Nguyen Quy",
    },
    {
      firstName: "Bao",
      lastName: "Pham Gia",
    },
    {
      firstName: "Minh",
      lastName: "Nguyen Quy",
    },
    {
      firstName: "Bao",
      lastName: "Pham Gia",
    },
    {
      firstName: "Minh",
      lastName: "Nguyen Quy",
    },
    {
      firstName: "Bao",
      lastName: "Pham Gia",
    },
    {
      firstName: "Minh",
      lastName: "Nguyen Quy",
    },
    {
      firstName: "Bao",
      lastName: "Pham Gia",
    },
    {
      firstName: "Minh",
      lastName: "Nguyen Quy",
    },
    {
      firstName: "Bao",
      lastName: "Pham Gia",
    },
    {
      firstName: "Minh",
      lastName: "Nguyen Quy",
    },
    {
      firstName: "Bao",
      lastName: "Pham Gia",
    },
    {
      firstName: "Minh",
      lastName: "Nguyen Quy",
    },
    {
      firstName: "Bao",
      lastName: "Pham Gia",
    },
    {
      firstName: "Minh",
      lastName: "Nguyen Quy",
    },
    {
      firstName: "Bao",
      lastName: "Pham Gia",
    },
    {
      firstName: "Minh",
      lastName: "Nguyen Quy",
    },
    {
      firstName: "Bao",
      lastName: "Pham Gia",
    },
    {
      firstName: "Minh",
      lastName: "Nguyen Quy",
    },
    {
      firstName: "Bao",
      lastName: "Pham Gia",
    },
    {
      firstName: "Minh",
      lastName: "Nguyen Quy",
    },
    {
      firstName: "Bao",
      lastName: "Pham Gia",
    },
    {
      firstName: "Minh",
      lastName: "Nguyen Quy",
    },
  ];

  const tableData = users.map((user, index) => ({
    id: index,
    firstName: user.firstName,
    lastName: user.lastName,
    action: (
      <Button colorScheme="gray" onClick={() => console.log("Hello World")} />
    ),
  }));

  const tableColumns = [
    {
      Id: "Id",
      accessor: "id",
    },
    {
      Header: "First Name",
      accessor: "firstName",
    },
    {
      Header: "Last Name",
      accessor: "lastName",
    },
  ];
  return (
    <Box>
      <Button onClick={getData}>Get data</Button>
      {/*<Box overflowY="auto" h="300px">*/}
      <Table
        colorScheme={PRIMARY_COLOR}
        height="300px"
        columns={tableColumns}
        data={tableData}
        totalRegisters={users.length}
        page={page}
        onPageChange={(page) => setPage(page)}
      />
      {/*</Box>*/}
    </Box>
  );
};

export default DashBoard;
