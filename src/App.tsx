import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TableRow from '@material-ui/core/TableRow';  
import Paper from '@material-ui/core/Paper';  

import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
  makeStyles
} from '@material-ui/core/'
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

interface componentState {
  ProductData:{
    id: number, title: string , year: string
  }[];
 
  
}

const useStyles = makeStyles(theme => ({
  root: {
      flexGrow: 1,
      padding: theme.spacing(2)
  }
}))

export class App extends Component<{},componentState> {
//export class MatTable extends Component {  
    constructor(props: any) {  
      super(props)  
      this.state = {  
        ProductData: []
      }  
      
     
    } 

    

    componentDidMount() {  
      // axios.get('http://localhost:51760/Api/Emp/employee').then(response => {  
      //   console.log(response.data);  
      //   this.setState({  
      //     ProductData: response.data  
      //   });  
      // });  

  
      this.setState({  
            ProductData: [
              { id: 1, title: 'Conan the Barbarian', year: '1982' },
              { id: 1, title: 'Conan the Barbarian', year: '1982' },
              { id: 1, title: 'Conan the Barbarian', year: '1982' },
              { id: 1, title: 'Conan the Barbarian', year: '1982' },
              { id: 1, title: 'Conan the Barbarian', year: '1982' },
              { id: 1, title: 'Conan the Barbarian', year: '1982' },
              { id: 1, title: 'Conan the Barbarian', year: '1982' },
              { id: 1, title: 'Conan the Barbarian', year: '1982' },
            ]
        }); 
    }  
     
    render() {  
     
      return(

      //   <ToggleButtonGroup orientation="horizontal" value={this.state.view} exclusive onChange={this.handleChange}>
      //   <ToggleButton value="list" aria-label="list">
      //     <ViewListIcon />
      //   </ToggleButton>
      //   <ToggleButton value="module" aria-label="module">
      //     <ViewModuleIcon />
      //   </ToggleButton>
      //   <ToggleButton value="quilt" aria-label="quilt">
      //     <ViewQuiltIcon />
      //   </ToggleButton>
      // </ToggleButtonGroup>

        <TableContainer component={Paper}>  
          <Table stickyHeader  aria-label="sticky table"> 
            <TableHead> 
              <TableRow>
                <TableCell >Id</TableCell>  
                <TableCell align="right">Title</TableCell>  
                <TableCell style={{paddingRight:"60px"}} align="right" >Year</TableCell>  
              </TableRow>  
            </TableHead>
            <TableBody>  
            {  
              this.state.ProductData.map((p, index) => {  
                return <TableRow key={index}>
                  <TableCell component="th" scope="row">{p.id} </TableCell>  
                  <TableCell align="right">{p.title}</TableCell>  
                  <TableCell style={{paddingRight:"114px"}} align="right">{p.year}</TableCell>  
                </TableRow>  
              })  
            }  
            </TableBody>  
          </Table> 
        </TableContainer>  
      
    

    // <Grid
    //             container
    //             spacing={2}
    //             direction="row"
    //             justify="flex-start"
    //             alignItems="flex-start"
    //         >
    //             {this.state.ProductData.map(elem => (
    //                 <Grid item xs={12} sm={6} md={3} key={this.state.ProductData.indexOf(elem)}>
    //                     <Card>
    //                         <CardHeader
    //                             title={`quarter : ${elem.title}`}
    //                             subheader={`earnings : ${elem.year}`}
    //                         />
    //                         <CardContent>
    //                             <Typography variant="h5" gutterBottom>
    //                                 Hello World
    //                             </Typography>
    //                         </CardContent>
    //                     </Card>
    //                  </Grid>
    //             ))}
    //         </Grid>
        
      )
    }


   

  }
export default App;
