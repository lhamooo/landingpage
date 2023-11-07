import './App.css';
import * as THREE from 'three'
import React, { useRef, Suspense } from "react";
import logo from './cat_love2.gif';
import texture from './NormalMap.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { CameraShake, MeshDistortMaterial } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import sec2 from './sec2.svg'
import sec3 from './sec3.svg'
import sec4 from './sec4.svg'
import sec5 from './sec5.svg'
import pic from './flat_transp.svg'
import question from './question.png'

class CircularProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    

  }



  render() {
    // Size of the enclosing square
    const sqSize = this.props.sqSize;
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (this.props.sqSize - this.props.strokeWidth) / 2;
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2;
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - dashArray * this.props.percentage / 100;



    return (
      <svg
        width={this.props.sqSize}
        height={this.props.sqSize}
        viewBox={viewBox}>
        <circle
          className="circle-background"
          cx={this.props.sqSize / 2}
          cy={this.props.sqSize / 2}
          r={radius}
          strokeWidth={`${this.props.strokeWidth}px`} />
        <circle
          className="circle-progress"
          cx={this.props.sqSize / 2}
          cy={this.props.sqSize / 2}
          r={radius}
          strokeWidth={`${this.props.strokeWidth}px`}
          // Start progress marker at 12 O'Clock
          transform={`rotate(-90 ${this.props.sqSize / 2} ${this.props.sqSize / 2})`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset
          }} />
        <text
          className="circle-text"
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle">
          {`${this.props.percentage}%`}
        </text>
      </svg>
    );
  }
}
function Rig({ children }) {
  const ref = useRef()
  const vec = new THREE.Vector3()
  const { camera, mouse } = useThree()
  useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, 0, 3.5), 0.05)
    ref.current.position.lerp(vec.set(mouse.x * 1, mouse.y * 0.5, 0), 0.1)
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (-mouse.x * Math.PI) / 20, 0.1)
  })
  return <group ref={ref}>{children}</group>
}
// Draw Sphere
function Sphere(props) {
  const colorMap = useLoader(TextureLoader, texture)

  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.x += 0.005
    mesh.current.rotation.y += 0.0075
  });
  return (

    <mesh ref={mesh} position={[0, 0, 0]} castShadow>
      <sphereGeometry
        attach="geometry"
        args={[1, 44, 50]} // Width, Height and Depth of the sphere
        meta
        {...props}
      />
      <MeshDistortMaterial color={0xdcf2f1} attach="material" map={colorMap} distort={0.2} speed={1} roughness={0} />

    </mesh>

  );
}

CircularProgressBar.defaultProps = {
  sqSize: 100,
  percentage: 25,
  strokeWidth: 10
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      percentage: 60
    };

    this.handleChangeEvent = this.handleChangeEvent.bind(this);
  }

  handleChangeEvent(event) {
    this.setState({
      percentage: event.target.value
    });
  }



  render() {
    AOS.init();
    return (
      <div>
   <div id="main">
    <div id="top">
      <div id="top-text">
        <h1 id="top-h1">PASSWORD VAULT</h1>
        <h2>M.183</h2>
              <p id="top-p">As part of Module 183, I tried to develop a secure password manager.
My project consists of registration, login and the main software in which passwords can be saved, edited and deleted.
Sign up now and try out Password Vault!
      </p>
      <div>
      <button id="signup">Sign-Up</button>
      <button id="login">Login</button>
      </div>
      <div id="help">
        <p id= "help-text">Need help getting started</p>
        <a id="link-icon"href ="https://github.com/lhamooo/landingpage/blob/main/README.md"> <img id ="help-icon" src={question} ></img></a>
         
        <div  className="hide">In our  <a href ="https://gitlab.com/vivienne_schoenenberger/password-vault/-/blob/main/README.md">README.md </a> I explain to you everything step by step</div>
      </div>
      
      <span></span>
      </div>

      <img src={pic} width="700px" height="700px"></img>
    </div>
        <div id="anim_divs">
          <div className="anim_div_fade_right1" data-aos="fade-right">
            <img className="sec2" src={sec2}></img>
            <h3>SECURITY GUARANTIED</h3>
            <p className="anim_div_text ">My Password Vault is secure thanks to Antisamy which cleans out malicious code and prevents any kind of HTML or JS injection. 
              I have also secured our Login and Registration thanks to Spring Security.</p>
          </div>
          <div className="anim_div_fade_left" data-aos="fade-left">
          <h3>NO NEED TO REMEMGER PASSWORDS</h3>
            <p className="anim_div_text ">With the password manager theres no need to remember passwords. Passwords of any kind can be saved (securely of course), edited and deleted. Password management made easy !</p>
            <img  className ="sec2" src={sec3} width="450px"></img>
          </div>
          <div className="anim_div_fade_right2" data-aos="fade-right">
          <img className ="sec4" src={sec4}></img>
          <h3>AES ENCRYPTION</h3>
            <p className="anim_div_text ">Passwords should never be saved in plain text. 
Thats why Password Vaults uses AES Encryption which encrypts the passwords symmetricly (meaning only one key is being used for en- and decryption)</p>
          </div>
        </div>
      <div id="m152">
        <div id="three.jsBall">
          <Suspense fallback={null}>
            <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 15] }}>
              <ambientLight intensity={0.5} />
              {/*An directional light which aims form the given position */}
              <directionalLight position={[10, 10, 5]} intensity={1} />
              {/*An point light, basically the same as directional. This one points from under */}
              <pointLight position={[0, -10, 5]} intensity={1} />
              <Rig>
                <Sphere position={[0, 0, 0]} />
              </Rig>
              <CameraShake yawFrequency={0.2} pitchFrequency={0.2} rollFrequency={0.2} />
            </Canvas>
          </Suspense>
        </div>
        <div>
          <h2>M.152</h2>
        <p id="m152-p">As a part of module 152 (integrating multimedia content into the website) 
            I did not only created videos and animations, we also created this cool landing page and a stunning front end for our password vault. 
            I used React.js, bootstrap and played around with three.js ( see this ball on the left :D ).
 
      </p>
        </div>
        </div>

        <div id="footer" data-aos='fade-down'>
          <div id="creator-text">            
            <img className ="sec5" src={sec5}></img>
            <p id="textFooter"> Creator of this project is Lhamo Claudia Abo.
            Even if there are still things to imporve about it (or things that don't work at the moment) 
            I still had fun spending our time with coding and designing the frontend :) . </p>
            </div>
          <div className="stage"> </div>
          <div id="svg_footer">
          <img id="svg_pic"src={logo} alt="gif..." />

          </div>
        </div>
      </div>
      </div>
    );
  }
}


export default App;