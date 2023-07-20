import ColumnFilter, { columnFilter } from './ColumnFilter';

export const COLUMNS = [
  {
    Header: 'Id',
    Footer: 'Id',
    accessor: 'id',
    Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: 'Name',
    Footer: 'Name',
    accessor: 'name',
    Filter: ColumnFilter,
  },
  {
    Header: 'Gender',
    Footer: 'Gender',
    accessor: 'gender',
    Filter: ColumnFilter,
  },
  {
    Header: 'Year',
    Footer: 'Year',
    accessor: 'year_id',
    Filter: ColumnFilter,
  },
  {
    Header: 'Group',
    Footer: 'Group',
    accessor: 'group_name',
    Filter: ColumnFilter,
  },
];

export const GROUPED_COLUMNS = [
  {
    Header: 'Id',
    Footer: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Name',
    Footer: 'Name',
    columns: [
      {
        Header: 'First Name',
        Footer: 'First Name',
        accessor: 'first_name',
      },
      {
        Header: 'Last Name',
        Footer: 'Last Name',
        accessor: 'last_name',
      },
    ],
  },
  // {
  //   Header: "Info",
  //   Footer: "Info",
  //   columns: [
  //     {
  //       Header: "Date of Birth",
  //       Footer: "Date of Birth",
  //       accessor: "date_of_birth",
  //     },
  //     {
  //       Header: "Country",
  //       Footer: "Country",
  //       accessor: "country",
  //     },
  //     {
  //       Header: "Phone",
  //       Footer: "Phone",
  //       accessor: "phone",
  //     },
  //   ],
  // },
];
