import React from "react";

// Components
import { Header, FilterSection, Table } from "./_components";

// Data
import { TableData } from "@/data/TableData";

const HeaderData = {
  currentBalance: 628432.9,
  availableBalance: 1371568.1,
  calculateProgressBarPercentage() {
    return (this.currentBalance / this.availableBalance) * 100 + "%";
  },
};

const Overview = () => {
  // console.log(HeaderData.calculateProgressBarPercentage());
  return (
    <>
      <Header
        currentBalance={HeaderData.currentBalance}
        availableBalance={HeaderData.availableBalance}
        maxBalance={HeaderData.calculateProgressBarPercentage()}
      />

      <FilterSection />

      <Table data={TableData} />
    </>
  );
};

export default Overview;
