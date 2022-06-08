import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
//rating component - following 3 lines
import Box from '@mui/material/Box';
import Rating , { IconContainerProps } from '@mui/material/Rating';
import Typography from '@mui/material/Typography';


function Header(props){
  console.log(props);
  return <header><h1><a href = "/" onClick={(evt)=>{
    console.log('event : ', evt);
    props.onSelect();
  }}>pjk Web</a></h1></header>
}


function Nav(props){
  console.log('props data : ', props.taglist)
  // const taglist= [
  //     <li><a href="read/1">html</a></li>,
  //     <li><a href="read/2">css</a></li>
  // ]
  let {taglist} = props;

  taglist = taglist.map(e=>{
    return <li key = {e.id}><a href = {'/read'+e.id} onClick = {()=>{
      props.onSelect(e.id);
      debugger;
    }}>{e.title}</a></li>
  })
  return <nav>
  <ol>
      {taglist}
  </ol>
  </nav>
}

function Article(props){
  console.log('props : ', props.title);
return <article>
        <h2>{props.title}</h2>
        {props.body}
    </article>
}

function createHandler (){
  alert("create clicked")
}



function App() {
  const topics = [
    {id : 1, title : 'html', body : "html is..."},
    {id : 2, title : "css", body : "css is ..."}
  ];
  const [value, setValue] = useState(0);
  return (
    <div className="App">
       <Header onSelect = {()=> {alert("header!!")}}></Header>
       <Nav taglist={topics} onSelect = {(id)=> {alert("NAV!!"+','+id)}}></Nav>
       <Article title = "Welcome" body = "Hello, WEB!"></Article>
       {/* <Button variant = "outlined"> Create </Button> */}
       <ButtonGroup variant = "contained">
       <Button variant = "outlined" onClick = {createHandler}> Create </Button>
       <Button variant = "outlined"> Update </Button>
       <Button variant = "outlined"> Delete </Button> 
          </ButtonGroup>
      <br /> 
      <a href="http://info.cern.ch">web</a>
      <br />
      <Typography component="legend">Controlled</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
<Typography component="legend">Read only</Typography>
<Rating name="read-only" value={value} readOnly />
<Typography component="legend">Disabled</Typography>
<Rating name="disabled" value={value} disabled />
<Typography component="legend">No rating given</Typography>
<Rating name="no-value" value={value} />

    </div>
  );
}

export default App;