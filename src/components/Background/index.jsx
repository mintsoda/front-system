import React from 'react';
import Particles from 'react-particles-js';
import ParticlesReturn from '../../utils/ParticlesReturn'
const particleArray = {
    0: 'simpleParticles',
    1: 'starsParticles',
    2: 'snowParticles',
    3: 'polygonParticles'
}
class Background extends React.Component {
    constructor(props) {
        super(props)
        this.particlesReturn = new ParticlesReturn()
        this.Particles = this.particlesReturn[particleArray[parseInt(Math.random() * 4)]]()
    }
    render() {
    return (<Particles
        params={this.Particles}
        style={{
            zIndex: '-1',
            width: '100%',
            height: '100%',
            position: 'absolute',
            left: '0px',
            top: 0,
            background: '#E5EEFF'
        }}
    />)
    }
}
export default Background;
