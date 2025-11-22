document.querySelectorAll('.clickable').forEach((art) => {
  art.addEventListener('mouseenter', () => {
    const detailsText = art.getAttribute('details'); // Get details attribute
    const detailEntity = art.querySelector('.art-info'); // Find child text entity

    // Update the detail text and make it visible
    detailEntity.setAttribute('text', `value: ${detailsText}; color: white; width: 4; align: center`);
    detailEntity.setAttribute('visible', true);
  });

  art.addEventListener('mouseleave', () => {
    const detailEntity = art.querySelector('.art-info');
    detailEntity.setAttribute('visible', false); // Hide the text
  });
});


// document.querySelectorAll('.clickable').forEach((art) => {
//   art.addEventListener('mouseenter', () => {
//     const details = document.querySelector('.art-info');
//     const artDetails = art.getAttribute('details');
    
//     // Update the details entity with the art's details
//     details.setAttribute('text', `value: ${artDetails}; color: white; width: 4; align: center`);
//     details.setAttribute('visible', true);
//   });

//   art.addEventListener('mouseleave', () => {
//     const details = document.querySelector('.art-info');
//     details.setAttribute('visible', false);
//   });
// });

AFRAME.registerComponent('show-details', {
  schema: {
      details: { type: 'string' } // Attribute for details
  },
  init: function () {
      const el = this.el;

      // Event: Start showing details when raycaster detects hover
      el.addEventListener('raycaster-intersected', (evt) => {
          const details = el.getAttribute('details'); // Get the details attribute
          showDetails(details, el); // Show details for the specific element
      });

      // Event: Stop showing details when hover ends
      el.addEventListener('raycaster-intersected-cleared', (evt) => {
          hideDetails(); // Hide details when no longer hovering
      });
  }
});

// Function to show artwork details
function showDetails(details, targetElement) {
  if (!details) return; // No details to show

  // Prevent overlapping info boxes by clearing any existing one
  hideDetails();

  const infoBox = document.createElement('div');
  infoBox.setAttribute('id', 'info-box');
  infoBox.style.position = 'fixed';
  infoBox.style.bottom = '20px';
  infoBox.style.left = '50%';
  infoBox.style.transform = 'translateX(-50%)';
  infoBox.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  infoBox.style.color = '#fff';
  infoBox.style.padding = '10px 20px';
  infoBox.style.borderRadius = '5px';
  infoBox.style.zIndex = '1000';
  infoBox.innerText = details;

  // Append the info box to the body
  document.body.appendChild(infoBox);
}

// Function to hide artwork details
function hideDetails() {
  const existingInfoBox = document.getElementById('info-box');
  if (existingInfoBox) {
      existingInfoBox.remove(); // Remove the existing info box if it exists
  }
}

// For Movement
AFRAME.registerComponent('controller-movement', {
  init: function () {
    const el = this.el; // The controller entity
    const rig = document.getElementById('cameraRig'); // The camera rig for movement

    // Listen for thumbstick movement
    el.addEventListener('thumbstickmoved', (evt) => {
      const { x, y } = evt.detail; // x for left/right, y for forward/backward

      // Move the camera rig based on the thumbstick input
      if (rig) {
        const currentPosition = rig.getAttribute('position');
        rig.setAttribute('position', {
          x: currentPosition.x - x * 0.03, // Adjust the speed multiplier as needed
          y: currentPosition.y,
          z: currentPosition.z - y * 0.03
        });
      }
    });
  }
});
