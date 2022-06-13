import './App.css';
import React, {useState} from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
//rating component - following 3 lines
import Box from '@mui/material/Box';
import Rating , { IconContainerProps } from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

function Header(props){
  console.log(props);
  const myStyle = {
    borderBottom : '1px solid gray',
    padding : '10px',
    fontSize : '20px'
  }

  return <header className = {props.className}><h1><a href = "/" onClick={(evt)=>{
    console.log('event : ', evt);
    evt.preventDefault();
    props.onSelect();
  }}>pjk Web</a></h1></header>
}

const HeaderStyled = styled(Header)
`border-bottom: 1px solid green;
`;

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
      // debugger;
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

function Create (props){
  return (
  <article>
    <h2>Create</h2>
    <form onSubmit={(evt)=>{
        
        evt.preventDefault();
        const title = evt.target.title.value;
        const body = evt.target.body.value;
        console.log('from create: ', title, body);
        props.onCreate(title, body);
        }}>
      <p><input type="text" name = "title" placeholder="title"></input></p>
      <p><textarea name = "body" placeholder='body'></textarea></p>
      <p><input type = "submit" value="Create"></input></p>
    </form>
  </article>
  );
}

function App() {
  console.log('useState:',useState('a'));
  // const topics = [
  //   {id : 1, title : 'html', body : "html is..."},
  //   {id : 2, title : "css", body : "css is ..."}
  // ];
  const [value, setValue] = useState(0);
  const [mode, setMode] = useState('Welcome');
  const [id, setId] = useState(null);
  console.log('mode & id : ', mode, id)

  const [ topics, setTopics] = useState([
    {id : 1, title : 'html', body : "html is..."},
    {id : 2, title : "css", body : "css is ..."}
  ]);
  const[nextId, setNextId] = useState(3);

  // let mode = 'Welcome';
  let content = null;
  if(mode === 'Welcome') {
    content = <Article title = "Welcome" body = "Hello, WEB!"></Article>
  } else if (mode ==='READ'){
      content = <Article title = "READ" body = "Hello, WEB2!"></Article>
  } else if(mode === 'CREATE'){
    content = <Create onCreate = {(title, body)=>{
      alert('oncreate : ', title)
      const newTopic = {id:nextId, title, body}
      const newTopics = [...topics]
      newTopics.push(newTopic)
      setTopics(newTopics)
      setId(nextId)
      setMode('READ')
      setNextId(nextId+1)


    }} />
    
  }
  return (
    <div className="App">
       <HeaderStyled onSelect = {()=> {setMode('Welcome')}}></HeaderStyled>
       <Nav taglist={topics} onSelect = {(id)=> {setMode('READ'); setId(id);}}></Nav>
       {content}
       {/* <Button variant = "outlined"> Create </Button> */}
       <ButtonGroup variant = "contained">
       <Button variant = "outlined" onClick = {()=>{setMode('CREATE')}}> Create </Button>
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
