import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Divider, Image } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import Category from './components/Category';
import { Container, Grid, useMediaQuery, useTheme } from '@mui/material';
import { CameraAlt, DarkMode, Favorite, LightMode } from '@mui/icons-material';
import confetti from 'canvas-confetti';
import axios from 'axios';


function App() {

  const [photos,setPhotos] = useState([{}]);

  const [categories,setCategories] = useState([""]);

  const loadConfetti = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
 
    const frame = () => {
      if (Date.now() > end) return;
 
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });
 
      requestAnimationFrame(frame);
    };
 
    frame();
  };

  const triggerFireWorks = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
 
    const randomInRange = (min, max) =>
      Math.random() * (max - min) + min;
 
    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();
 
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
 
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const triggerEmojis = () => {
    const scalar = 2;
    const unicorn = confetti.shapeFromText({ text: "💗💙", scalar });
 
    const defaults = {
      spread: 360,
      ticks: 60,
      gravity: 0,
      decay: 0.96,
      startVelocity: 20,
      shapes: [unicorn],
      scalar,
    };
 
    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 30,
      });
 
      confetti({
        ...defaults,
        particleCount: 5,
      });
 
      confetti({
        ...defaults,
        particleCount: 15,
        scalar: scalar / 2,
        shapes: ["circle"],
      });
    };
 
    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  };

  const handleClick = ()=>{
    confetti({});confetti({});confetti({});
  }

  useEffect(()=>{
    //confetti at the time of component mounting
    loadConfetti();

    axios('https://sb-ng-api.onrender.com/getGames')
    .then((res)=>{
      setPhotos(res.data);
      console.log(res.data);
    })
    .catch((err)=>{
      console.error(err);
    })

    axios('https://sb-ng-api.onrender.com/getCategories')
    .then((res)=>{
      res.data.unshift("All");
      setCategories(res.data);
      console.log(res.data);
    })
    .catch((err)=>{
      console.error(err);
    })

  },[])

  //Define Media Size Screen boolean value
  const theme = useTheme();

  /*We will also use the useMediaQuery to make the responsive ness of that drawer active under certain screen size
    this returns a boolean which will become true under certain screen size condition
    so when the screen size is down from medium screen size, then only isMatch will become true
    and drawer will be shown then only*/
  const isMatch = useMediaQuery(theme.breakpoints.down('sm'));

  const [isTheme,setIsTheme] = useState(true);

  const handleTheme = ()=>{
    setIsTheme(!isTheme);
    triggerFireWorks();
  }

  const handleChange = (e)=>{
    //confetti onchange
    loadConfetti();
    
    axios(`https://sb-ng-api.onrender.com/onCategoryGames?category=${e.target.value}`)
    .then((res)=>{
      setPhotos(res.data);
      console.log(res.data);
    })
    .catch((err)=>{
      console.error(err);
    })
  }

  return (
    <>
      <Container maxWidth={isMatch?'xs' : 'xl'}
        sx={{
          // Chaing background on theme condition if theme button clicked then it will toggle theme
          backgroundImage: isTheme ? 'radial-gradient(circle at top left, rgba(0, 0, 0, 0.8), transparent),linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);' : 'white',
          minHeight : (isMatch)? "108vmax" : "72vmax",    /*Viewport max height it will expand automatically if required*/
        }}
      >
        <Grid container>
          <Grid item xs={8} md={6} lg={8} xl={8}>
            <header>
              <h2  style={{
                color: isTheme ? "white" : "darkblue",
                fontFamily:"monospace",
                fontWeight:"bold",
                fontSize:isMatch? "26px" : "37px",
                marginTop:isMatch?"10px":"0px",
                marginLeft:"3px"
              }}>
                {/* If screen size is lesser than sm breapoint then show less heading  */}
                My Love 🥹✨
              </h2>
            </header>
            
          </Grid>
          
          <Grid item xs={3} md={3} lg={3} xl={3}>
              
          </Grid>

          <Grid item xs={1} md={1} lg={1} xl={1}>
            <Button onClick={handleTheme} style={{marginTop:'10px'}} size='sm' isIconOnly color='black' aria-label="Like">
              {isTheme?<LightMode sx={{color:"white"}}/> : <DarkMode sx={{color:"darkblue"}}/>}
            </Button>  
          </Grid>
        </Grid>

        <hr style={{marginTop:"5px"}}/>
        <Category isMatch={isMatch} isTheme={isTheme} categories={categories} onChange={handleChange}/>
        <hr style={{marginTop:"15px"}}/>

        <h2 className='text-center' 
          style={{color:isTheme?"white":"darkblue",
            fontFamily:"monospace", fontSize:isMatch? "22px" : "32px"
          }}>
            Gallery :
        </h2>

        <Grid spacing={2} container>
          {
            photos.map((photo,index)=>(
              <Grid key={index} item xs={12} md={3} lg={3} xl={3}>
                  <Card key={photo._id} style={{border:isTheme?"3px solid white" : "3px solid darkblue", color:isTheme?"white":"darkblue" }} className={`py-4 ${isTheme ? 'bg-gray-600 text-white' : 'bg-white text-dark'}`} isPressable>   
                    <CardHeader className="flex gap-3">
                      <Avatar size='sm' isBordered color={isTheme?"warning" : "primary"} src={photo.image} />
                      
                      <div className="flex flex-col">
                        <p className="text-md" style={{color:"inherit"}}>{photo.title}</p>
                        <p className="text-small text-default-500" style={{color:"inherit"}}>{photo.category}</p>
                      </div>
                    </CardHeader>
              
                    <CardBody className="overflow-visible py-2">
                        <Image
                          style={{borderRadius:"20px", height:"350px", width:"350px", border:isTheme?"2px solid white":"2px solid darkblue"}}
                          alt="Card background"
                          className="object-cover h-64 w-full rounded-xl"
                          src={photo.image}
                          width={270}
                        />
                    </CardBody>
                    <CardFooter>
                      <Grid container spacing={1}>
                        <Grid item xs={1}> 
                          <Button color='danger' onClick={triggerEmojis} isIconOnly radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
                            <Favorite/>
                          </Button>
                        </Grid>
                        <Grid item xs={1}> 
                          
                        </Grid>
                        <Grid item xs={7}> 
                          <p style={{fontFamily:"monospace",fontWeight:"bold"}}>{photo.desc}[{photo.date}]</p>
                        </Grid>
                        <Grid item xs={1}> 
                          
                        </Grid>
                        <Grid item xs={1}> 
                          <Button onClick={handleClick} color={isTheme?'warning':'primary'} isIconOnly radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
                            <CameraAlt/>
                          </Button>
                        </Grid>
                      </Grid>
                    </CardFooter>
                  </Card>
              </Grid>
            ))
          }
        </Grid>

      </Container>
    </>
  );
}

export default App;
