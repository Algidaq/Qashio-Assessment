"use client";
import React, { useState } from "react";

// Components

import DatePicker from "react-datepicker";
import { Countdown } from "@/components";

// Types
import { CardProps } from "./types";

// Data
import { TableData } from "@/data/TableData";

// Icons
import { HiOutlineDownload } from "react-icons/hi";
import { CiSearch, CiDollar } from "react-icons/ci";
import { MdClear, MdOutlineDateRange } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import { MdOutlineOpenInFull } from "react-icons/md";

// styles
import styles from "./FilterSection.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const arrayCard: CardProps[] = [
  {
    CardTitle: "Transactoins",
    CardIcon: "$",
    CardClassName: styles.cardAmount,
    CardAmount: 1563,
  },
  {
    CardTitle: "Total Spend",
    CardIcon: "$",
    CardClassName: styles.cardAmount,
    CardAmount: 1228.9,
  },
  {
    CardTitle: "Missing Receipts",
    PostCardIcon: <MdOutlineOpenInFull className={styles.cardIconStyle} />,
    CardClassName: styles.cardAmountRed,
    CardAmount: 42,
  },
];

const FilterSection = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const searchDefault = useSearchParams().get("search");
  const [search, setSearch] = useState(searchDefault ?? "");

  const handleOnSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      updateUrlQueryParams(search);
    }
  };

  const handleOnClearSearch = () => {
    setSearch("");
    updateUrlQueryParams("");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterWrapper}>
        <div className={styles.filters}>
          <div className={styles.searchWrapper}>
            <CiSearch className={styles.icon} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search & Filter"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              onKeyDown={handleOnSearch}
            />
            {search.length > 0 && (
              <MdClear className={styles.icon} onClick={handleOnClearSearch} />
            )}
          </div>
          <div className={styles.dateWrapper}>
            <div className={styles.datePickerWrapper}>
              <div className={styles.datePikcerleftSide}>
                <MdOutlineDateRange className={styles.icon} />
                <DatePicker
                  selected={startDate}
                  showTimeSelect
                  dateFormat="Pp"
                  onChange={(date) => setStartDate(date)}
                  className={styles.dateInpute}
                  dropdownMode="scroll"
                />
              </div>
              <FaAngleDown className={styles.icon} />
            </div>
            <div className={styles.dollarIcon}>
              <CiDollar className={styles.iconDollar} />
            </div>
          </div>
        </div>
        <div
          className={styles.downloadButton}
          // onClick={() => {
          //   exportToExcel(TableData, "table-data");
          // }}
        >
          <HiOutlineDownload className={styles.icon} />
        </div>
      </div>
      <div className={styles.cardsWrapper}>
        {arrayCard.map((card, index) => (
          <div key={index}>
            <Card
              CardTitle={card.CardTitle}
              CardAmount={card.CardAmount}
              CardIcon={card.CardIcon}
              PostCardIcon={card.PostCardIcon}
              CardClassName={card.CardClassName}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const Card: React.FC<CardProps> = ({
  CardTitle,
  CardAmount,
  CardIcon,
  CardClassName,
  PostCardIcon,
}) => {
  return (
    <div className={styles.singleCard}>
      <p className={styles.cardTitle}>{CardTitle}</p>
      <Countdown
        className={CardClassName}
        countdown={CardAmount}
        step={100}
        speed={10}
        preText={CardIcon}
        postText={PostCardIcon}
      />
    </div>
  );
};

const updateUrlQueryParams = (search: string) => {
  const query = new URLSearchParams({ search: search });

  window.history.pushState(null, "", `?${query.toString()}`);
};

export default FilterSection;
