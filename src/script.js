var Image1 = null;
var Image2 = null;
var Image1Canvas;
var Image2Canvas;

function clearBits(colorval)
{
	var x = Math.floor(colorval/16)*16;
	return x;
}

function chop2hide(image)
{
	for(var px of image.values())
	{
	    px.setRed(clearBits(px.getRed()));
			px.setBlue(clearBits(px.getBlue()));
    	px.setGreen(clearBits(px.getGreen()));
	}
  return image;
}

function shift(image)
{
	for(var px of image.values())
	{
		px.setRed(px.getRed()/16);
		px.setGreen(px.getGreen()/16);
		px.setBlue(px.getBlue()/16);
	}
  return image;

}

function Combine(image1 , image2)
{
	var ans = new SimpleImage(image1.getWidth() , image1.getHeight());
	for( var px of ans.values())
	{
		var x = px.getX();
		var y = px.getY();
		var showPixel = image1.getPixel(x,y);
		var hidePixel = image2.getPixel(x,y);
		px.setRed(showPixel.getRed() + hidePixel.getRed());
		px.setBlue(showPixel.getBlue() + hidePixel.getBlue());
		px.setGreen(showPixel.getGreen() + hidePixel.getGreen());
  }
  return ans;
}

function loadImage1() {
  var file = document.getElementById("image1file");
  Image1 = new SimpleImage(file);
  Image1Canvas = document.getElementById("image1Canvas");
  Image1.drawTo(Image1Canvas);
  chop2hide();
}

function loadImage2() {
  var file = document.getElementById("image2file");
  Image2 = new SimpleImage(file);
  Image2Canvas = document.getElementById("image2Canvas");
  Image2.drawTo(Image2Canvas);
  shift();
}

function Hide() {
  //check that images are loaded
  if (Image1 == null  || ! Image1.complete()) {
    alert("Image1 not loaded");
  }
  if (Image2 == null || ! Image2.complete()) {
    alert("Image2 not loaded");
  }
   clearCanvas();
  Image1 = chop2hide(Image1);
  Image2 = shift(Image2);
  var finalImage = Combine(Image1 , Image2);
  finalImage.drawTo(Image1Canvas);
}

function clearCanvas() {
  doClear(Image1Canvas);
  doClear(Image2Canvas);
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}