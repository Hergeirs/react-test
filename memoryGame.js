let previousChoice = [];
let pairedImgs = [];

let amountImages=16;  // amount of images currently in images folder
let imagePath="img/";

/* Hides the images chosen since last successful match. */
function hideChoices() {
  for(let i=0; i<previousChoice.length; ++i) {
    hideImg(previousChoice[i]);
  }
}

/* Returns true if the previousChoice are of the same image. If not, false is returned */
function compareChoices() {
  if(previousChoice[0].src === previousChoice[1].src) {
    previousChoice[0].classList.add('paired');
    previousChoice[1].classList.add('paired');
  }
  return previousChoice[0].src === previousChoice[1].src
}

/*  Hides the element passed into it */
function hideImg(img) {
  img.style.display = 'none';
  img.classList.remove('flipped');
}

/*  Renders the element passed into it visible */
function showImg(img) {
  img.style.display = 'block';
  void img.offsetWidth; // trigger reflow
  img.classList.add("flipped");
}

function isVisible(img) {
  return img.style.display !== 'none';
}


/* Handles click on cells */
function chooseImg() {
  let img = this.firstElementChild;

  // if(same element already paired or first choice, do nothing.
  if((previousChoice.length==1 && previousChoice[0]===img) || pairedImgs.includes(img.src)){
    console.log("doing nothing");
    return;
  }

  console.log("doing something...?");

  // to match the pair ASAP
  if(previousChoice.length===1) {
    if(previousChoice[0].src===img.src){
      pairedImgs.push(img.src);
    }
  }

  // if two choices have been made. Need to compare and handle if they're the same image.
  if(previousChoice.length===2) {
    console.log("3. choice made... comparing src of previous");
    if(!compareChoices()) {
      hideChoices();
    }
    previousChoice = [];
  }
  previousChoice.push(img);

  showImg(img);

  console.log("amountPairs: "+amountPairs);
  console.log("pairedImgs.length: "+pairedImgs.length);

  if(amountPairs===pairedImgs.length)
    window.setTimeout(alert("Congratulations!\nyou won the game :D"),5);
    
}

/* returns an array with the specified amount of random numbers in range. */
function getRandomNumbers(amountNumbers, from=Number.MIN_VALUE, to=Number.MAX_VALUE, unique=false) {
  let delta = to-from;
  let i =0, randomArr=[];
  while(randomArr.length<amountNumbers) {
    let random = Math.floor(Math.random()*delta) + from;
    if(unique && randomArr.includes(random))
      continue;
    randomArr.push(random);
  }
  return randomArr;
}


/* get random images from server returns the amount inputted */
function getRandomImageSrc(amount) {
  let imgs = [];
  let randomNumbers = getRandomNumbers(amount,1,amountImages,true);
  console.log(randomNumbers);
  for (let i in randomNumbers) {
    imgs.push(imagePath + randomNumbers[i] + ".png");
  }
  return imgs;
}

/* function returns a table with the specified width and heigth */
function createTable(width,height) {
  let table = document.createElement('table');
  // set an id for reference
  table.id = 'gameTable';
  let tbody = document.createElement('tbody');
  let row=null;
  for(let i=0; i<height; ++i) { // iterating over rows
    row = document.createElement('tr');
    for(let j=0; j<width; ++j) {  // iterating over cols
      row.appendChild(document.createElement('td')); // adding cell to table-row
    }
    tbody.appendChild(row);
  }
  table.appendChild(tbody);
  return table;
}

/* add images to table... creates table if image doesn't exist
 * @images is an array with the immages
 * @table is the table. If null, a table with amountCol and amountRow
 * */
function addImageTable(images,table=null,amountCol=4, amountRow=3) {
  if(table===null) {
    table=createTable(amountCol,amountRow);
  }
  console.log("creating images");
  let cells=table.getElementsByTagName('td');
  for (let i = 0, cell; cell = cells[i]; i++) {
    //iterate through cells
    //cells would be accessed using the "cell" variable assigned in the for loop
      let img = document.createElement('img');
      img.src = images[i];
      img.style.display='none';
      cell.appendChild(img);
      cell.onclick= chooseImg;
    }
  return table;
}

let amountPairs=0;

/* Prepares a new game. */
function prePareGame(rows=3, columns=4) {
  /* choosing random images from imageFolder */
  amountPairs = (rows*columns)/2;
  console.log("Getting "+amountPairs+" images");  
  let imgs = getRandomImageSrc(amountPairs);

  imgs = imgs.concat(imgs); // create array with two of every image

  /* prepares table. Adds images into it */
  let table = addImageTable(imgs,null,columns,rows);

  let gameTable = document.getElementById('gameTable')
  if(!!gameTable) {
    console.log("gameTable exists!");
    gameTable.parentNode.replaceChild(table,gameTable);
  }
  else {
    console.log("gameTable exists not!");
    document.getElementById('gameDiv').appendChild(table);
  }
}


function prepareInput() {
  let rows = parseInt(document.getElementById("rows").value);
  let columns = parseInt(document.getElementById("columns").value);

  console.log("Preparing input... rows: "+rows+" cols:" + columns);

  let neededImages = rows*columns;

  if(neededImages%2!==0) {
    alert("Can't work with odd number of cards!");
    return;
  }

  if(neededImages > amountImages*2){
    alert("Not enough images on server to accomodate")
    return;
  }
  prePareGame(rows,columns);
}
