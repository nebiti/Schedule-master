import React from 'react';
import axios from 'axios';
import { Tooltip, IconButton } from '@material-ui/core'
import MUIDataTable from 'mui-datatables';
import { withRouter } from 'react-router';
import { Update } from '@material-ui/icons';
import useStyle from './Styling';
const ScheduleTable = ({ history }) => {

     const urlData = "http://192.168.1.3/mct_sch/api.php";
     const classes = useStyle();
     const [data, setData] = React.useState([null])

     React.useEffect(() => {
          fetchSchedule()
     }, [])

     const handleClick = (row) => {
          const selectedRow = {
               accessory: row[0],
               accessoryQty: row[1],
               companyName: row[2],
               contactNumber: row[3],
               date: row[4],
               device: row[5],
               deviceQty: row[6],
               jobType: row[7],
               location: row[8],
               status: row[9],
               technician: row[10],
               _id: row[11],
          }
          history.push({ pathname: '/Update', state: { data: selectedRow } })
     }
     const fetchSchedule = async () => {
          const res = await axios.get(urlData + '/schedule')
          setData(res.data.schedule);
          console.log(res.data)
     }
     const options = {
          rowsPerPage: 10,
          rowsPerPageOptions: [5, 10],
          print: false,
          fixedHeader: true,
          selectableRows: 'none',
          filterType: 'checkbox',
          responsive: "scrollMaxHeight",
     }


     const columns = [
          {
               name: "accessory",
               label: "Accessory",
               options: {
                    filter: true,
                    sort: true,
               }
          },
          {
               name: "accessoryQty",
               label: "Accessory Quantity",
               options: {
                    filter: true,
                    sort: true,
               }
          },
          {
               name: "companyName",
               label: "Company Name",
               options: {
                    filter: true,
                    sort: true,
               }
          },
          {
               name: "contactNumber",
               label: "Contact Number",
               options: {
                    filter: true,
                    sort: true,
               }
          },
          {
               name: "date",
               label: "Date",
               options: {
                    filter: true,
                    sort: true,
               }
          },
          {
               name: "device",
               label: "Device",
               options: {
                    filter: true,
                    sort: true,
               }
          },
          {
               name: "deviceQty",
               label: "Device Quantity",
               options: {
                    filter: true,
                    sort: true,
               }
          },
          {
               name: "jobType",
               label: "Job Type",
               options: {
                    filter: true,
                    sort: true,
               }
          },
          {
               name: "location",
               label: "Location",
               options: {
                    filter: true,
                    sort: true,
               }
          },
          {
               name: "status",
               label: "Status",
               options: {
                    filter: true,
                    sort: true,
               }
          },
          {
               name: "technician",
               label: "Technician",
               options: {
                    filter: true,
                    sort: true
               }
          },
          {
               name: "_id",
               options: {
                    display: false,
                    filter: false,
               }
          },
          {
               name: "update",
               label: "Update",
               options: {
                    filter: false,
                    sort: false,
                    customBodyRender: (index, value) => {
                         return (
                              <Tooltip title="Update Info">
                                   <IconButton onClick={() => {
                                        const row = value.rowData;
                                        handleClick(row)
                                   }}><Update /></IconButton>
                              </Tooltip>
                         );
                    }
               }
          },
     ]
     return (
          <div className={classes.root}>
               <MUIDataTable
                    title={"Table Of Schedules"}
                    data={data}
                    columns={columns}
                    options={options}
               />
          </div>
     );
}

export default withRouter(ScheduleTable);
//done