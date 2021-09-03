import map from '/config/map/map.json';
import { savingMap } from '/core/components/map/tiledLoader'; // <- get rid of this
import { Component } from '../../component';

class DeveloperMode extends Component {
  constructor(parent) {
    super(parent);

    this.currentMaterial = 1;
    this.status = false;
    this.paused = false;
    this.debug = false;

    this.developerModeButton();
  }
  developerModeButton() {
    // Lock the mouse on debug mode
    var devMoode = document.querySelector('.dev-mode');

    //go through map.json textures and make interface image for each type of block
    Object.values(map.textures).forEach((texture, index) => {
      const img = new Image();
      img.src = texture.side;
      document.querySelector('.game_build_textures').appendChild(img);
      img.classList.add('block_' + index.toString());

      // Player Event on mouse click
      const imageClick = document.querySelector('.block_' + index.toString());
      imageClick.addEventListener('click', () => {
        this.currentMaterial = index + 1;
        devMoode.style.position = null;
      });
    });

    //Play Pause
    const pausePlay = document.querySelector('.pause-play');
    pausePlay.addEventListener('click', () => {
      //console.log('logging out the paused state', !this.paused);
      this.paused = !this.paused;
      BOX.Engine.noa.setPaused(this.paused);
    });

    document.querySelector('.game_build').style.display = 'none';

    //show block menu in developer mode and hide without developer mode
    const developerModeEvent = document.getElementById('developer-mode-button');
    developerModeEvent.addEventListener('click', () => {
      // Lock the mouse on debug mode
      devMoode.style.position = !this.debug ? 'absolute' : null;

      if (developerModeEvent.checked) {
        this.debug = !this.debug;
        document.querySelector('.game_build').style.display = 'block';

        Object.values(BOX.Engine.entities).forEach(entity => {
          if (entity.type == 'region') {
            entity.mesh.visibility = 0.6;
          }
        });
        this.status = true;
      } else {
        document.querySelector('.game_build').style.display = 'none';
        Object.values(BOX.Engine.entities).forEach(entity => {
          if (entity.type == 'region') {
            entity.mesh.visibility = 0;
          }
        });
        this.status = false;
      }
    });
  }

  addBlock() {
    console.log('placing block');
    const pos = BOX.Engine.noa.targetedBlock.adjacent;
    BOX.Engine.noa.addBlock(this.currentMaterial, pos[0], pos[1], pos[2]);
    savingMap.saveBlock(pos[0], pos[1], pos[2], this.currentMaterial);
  }

  removeBlock() {
    const pos = BOX.Engine.noa.targetedBlock.position;
    //check if target block is invisible material
    if (BOX.Engine.noa.targetedBlock.blockID === 1000) {
      ('');
    } else {
      BOX.Engine.noa.setBlock(0, pos[0], pos[1], pos[2]);
      savingMap.saveBlock(pos[0], pos[1], pos[2], 0);
    }
  }
}

export default DeveloperMode;
