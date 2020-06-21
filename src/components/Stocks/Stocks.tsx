import React, { Component } from 'react';
import styles from './stocks.module.css';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import Card from '@material-ui/core/Card';
import Papa from 'papaparse';
import { CssBaseline, Container, Grid, Typography, CardContent } from '@material-ui/core';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';


// Data columns 
interface Column {
  id: 'date' | 'open' | 'high' | 'low' | 'close' | 'volume';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'date', label: 'Date', minWidth: 170 },
  { id: 'open', label: 'Open', minWidth: 100 },
  {
    id: 'high',
    label: 'High',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'low',
    label: 'Low',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'close',
    label: 'Close',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'volume',
    label: 'Volume',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];


interface Data {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number
}


// State params
interface componentState {
  
  chnageView: string;
  page: any;
  setPage: any;
  rowsPerPage: any;
  setRowsPerPage: any;
  tStyle: any;
  fData: any[];
  tempData: [];
 
  
}


// function Stocks() {
  
  export class Stocks extends Component<{},componentState> {

    constructor(props: any) {  
      super(props)  
      this.state = {  
        chnageView: 'table',
        page: 0,
        setPage:0,
        rowsPerPage: 10,
        setRowsPerPage: 10,
        tStyle: 0,
        fData: [],
        tempData: []
      }  
      
      this.handleChangeView = this.handleChangeView.bind(this);
      this.handleChangePage = this.handleChangePage.bind(this);
      this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
      this.getData = this.getData.bind(this);
      this.setStyle = this.setStyle.bind(this);
    } 


    componentWillMount() {
      this.getCsvData();
    }

    // Fetch data from csv
    fetchCsv() {
      let datfile = require('./data.csv');
      return fetch(datfile)
        .then(response => response.body)
        .then((body: any )=> {
          let reader = body.getReader();
              return reader.read().then(function (result: any ) {
                let decoder = new TextDecoder('utf-8');
                return decoder.decode(result.value);
            });
        });
    }

   //Data fromation
    createDataNew(date: string, open: number, high: number, low: number, close: number, volume: number): Data {
      //const density = population / size;
      return { date, open, high, low, close, volume };
    }

    //Converet paresd json to array formate 
    getData(result: any ) {
      let newData = result.data.slice(1);
      let tt: any[] =[];
      newData.map((item: any ) => {
        let date = new Date(item[0]);  
        let str = date.toDateString();  
        tt.push(this.createDataNew(str, item[1], item[2], item[3], item[4], item[6]))
      })
      this.setState({fData: tt});  
    }

    //Get data from file and parse it to json 
    async getCsvData() {
        let csvData = await this.fetchCsv();
        Papa.parse(csvData, {
            complete: this.getData
        });
    }
   


   //Style fot table and grid
    setStyle(useStyles: any){

      useStyles = makeStyles((theme: Theme) =>
        createStyles({
          root: {
            //flexGrow: 1,
            //margin: 'auto',
            minWidth: 275,
          },
          container: {
            maxHeight: 440,
            padding: theme.spacing(2),
          },
          paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 500,
          },
          image: {
            width: 128,
            height: 128,
          },
          img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
          },
          bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
          },
          title: {
            fontSize: 14,
          },
          pos: {
            marginBottom: 12,
          },
        }),
      );
      this.setState({tStyle :useStyles })

    }

    //Cgange view table to grid and grif  to table
    handleChangeView = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
      //console.log("nextView", nextView);
      this.setState({chnageView :nextView })
      //setView(nextView);
    };

    //Page << previous and next >>
    handleChangePage = (event: unknown, newPage: number) => {
      //console.log("newPage", newPage);
      this.setState({page :newPage })
      //this.setPage(newPage);
      
    };

    // change no of row per page
    handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      this.setState({ page: 0, rowsPerPage: event.target.value });
      //console.log("rowsPerPage",this.state.rowsPerPage)
      
    };
        render() {  
          
          //const classes = useStyles();
          //const { classes } = this.props;
          //console.log("fData---", this.state.fData);
          return(
            <React.Fragment>
            <CssBaseline />
            <Container fixed>
            <div className={this.state.tStyle.root}>
                {/********* Toggle buttons **********/}
                <ToggleButtonGroup orientation="horizontal" exclusive onChange={this.handleChangeView}>
                  <ToggleButton value="table" aria-label="table">
                    <ViewListIcon />
                  </ToggleButton>
                  <ToggleButton value="list" aria-label="list">
                    <ViewModuleIcon />
                  </ToggleButton>
                </ToggleButtonGroup>

                {/********* Table **********/}
                <Paper className={this.state.tStyle.paper}  style={{display: (this.state.chnageView === 'table')? 'block': 'none'}} >
                <TableContainer>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.fData.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => {

                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.date}>
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number' ? column.format(value) : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                </Paper>

                {/********* Grid **********/}
                <Grid container spacing={3}  style={{display: (this.state.chnageView  === 'list')? 'block': 'none'}}>
                {this.state.fData.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => {
                    return (
                      <Grid item xs={12}>
                        <Card className={this.state.tStyle.root} variant="outlined">
                          <CardContent>
                            <Typography className={this.state.tStyle.title} color="textSecondary" gutterBottom>
                              Date: {row.date}
                            </Typography>
                            <Typography variant="h5" component="h2">
                              Volume : {row.volume}
                            </Typography>
                            <Typography className={this.state.tStyle.pos} color="textSecondary">
                              Close: {row.close}
                            </Typography>
                            <Typography variant="body2" component="p">
                              Open: {row.open} 
                              <br />
                              High: {row.high} 
                              <br />
                              Low: {row.low}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>   
                    );
                })}
              </Grid>
            
              {/********* Pagination **********/}
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={this.state.fData.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
              
            </div>
            </Container>
          </React.Fragment>
          )
        }
        
      }
export default Stocks;



