Topic[] topics = new Topic[12];
IntList x_coords = new IntList();
int[][] frequencies = new int[15][12];
int[][] frequenciesT = new int[12][15];
int[][] textranks = new int[15][12];
int[][] textranksT = new int[12][15];

void setup() {
  //frameRate(10);
  size(1400, 800);
  background(255, 204, 0);


  String[] freqs = loadStrings("data/freqs.csv");
  for (int i = 0; i < 15; i++) {
    int[] nums = int(split(freqs[i], ','));
    frequencies[i] = nums;
  }

  for (int i = 0; i < frequencies.length; i++) {
    int[] f = frequencies[i];
    for (int j = 0; j < f.length; j++) {
      frequenciesT[j][i] = f[j];
    }
  }

  String[] ranks = loadStrings("data/pagerank.csv");
  for (int i = 0; i < 15; i++) {
    int[] nums = int(split(ranks[i], ','));
    textranks[i] = nums;
  }

  for (int i = 0; i < textranks.length; i++) {
    int[] f = textranks[i];
    for (int j = 0; j < f.length; j++) {
      textranksT[j][i] = f[j];
    }
  }

  String[] lines = loadStrings("data/words.csv");
  StringList words = new StringList();
  for (int i = 0; i < lines.length; i++) {
    words.append(lines[i]);
  }

  StringList topic = new StringList();
  String[] tlines = loadStrings("data/topikok.csv");
  for (int i = 0; i < tlines.length; i++) {
    topic.append(tlines[i]);
  }

  for (int i = 0; i < topics.length; i++) {
    x_coords.append(i*100);
  }


  for (int i = 0; i < topics.length; i++) {
    topics[i] = new Topic(tlines[i], words, x_coords.get(i), 30, i, frequenciesT, textranksT, false);
  }


  PFont f;
  f = createFont("palamecia titling.ttf", 16, true);
  fill(0, 102, 153, 204);
  textFont(f, 15);

  //IntList x_coords = new IntList();
  //IntList y_coords = new IntList();


  for (int i = 0; i < words.size (); i = i + 1) {
    text(words.get(i), 10, (50 * i) + 80);
  }


  for (int i = 0; i < topic.size (); i += 1) {
    rectMode(CENTER);
    fill(0, 102, 153, 0);
    rect(190 + (100 * i), 40, 100, 30);
    fill(0, 102, 153, 204);
    text(topic.get(i), 140 + (100 * i), 40);
  }

  /*for (int i = 0; i < topics.length; i++) {
   topics[i].displayFreq();
   }*/
}

void draw() {


  if (mouseX > 150 && mouseX < 250 && mouseY > 40 && mouseY < 750) {
    topics[0].see = true;
    topics[0].displayRank2();
  } else {
    topics[0].see = false;
    topics[0].displayFreq2();
    topics[0].displayRank2();
  }

  if (mouseX > 250 && mouseX < 350 && mouseY > 40 && mouseY < 750) {
    topics[1].see = true;
    topics[1].displayRank2();
    topics[1].displayFreq2();
  } else {
    topics[1].see = false;
    topics[1].displayFreq2();
    topics[1].displayRank2();
  }

  if (mouseX > 350 && mouseX < 450 && mouseY > 40 && mouseY < 750) {
    topics[2].see = true;
    topics[2].displayRank2();
    topics[2].displayFreq2();
  } else {
    topics[2].see = false;
    topics[2].displayFreq2();
    topics[2].displayRank2();
  }

  if (mouseX > 450 && mouseX < 550 && mouseY > 40 && mouseY < 750) {
    topics[3].see = true;
    topics[3].displayRank2();
    topics[3].displayFreq2();
  } else {
    topics[3].see = false;
    topics[3].displayFreq2();
    topics[3].displayRank2();
  }

  if (mouseX > 550 && mouseX < 650 && mouseY > 40 && mouseY < 750) {
    topics[4].see = true;
    topics[4].displayRank2();
    topics[4].displayFreq2();
  } else {
    topics[4].see = false;
    topics[4].displayFreq2();
    topics[4].displayRank2();
  }

  if (mouseX > 650 && mouseX < 750 && mouseY > 40 && mouseY < 750) {
    topics[5].see = true;
    topics[5].displayRank2();
    topics[5].displayFreq2();
  } else {
    topics[5].see = false;
    topics[5].displayFreq2();
    topics[5].displayRank2();
  }

  if (mouseX > 750 && mouseX < 850 && mouseY > 40 && mouseY < 750) {
    topics[6].see = true;
    topics[6].displayRank2();
    topics[6].displayFreq2();
  } else {
    topics[6].see = false;
    topics[6].displayFreq2();
    topics[6].displayRank2();
  }

  if (mouseX > 850 && mouseX < 950 && mouseY > 40 && mouseY < 750) {
    topics[7].see = true;
    topics[7].displayRank2();
    topics[7].displayFreq2();
  } else {
    topics[7].see = false;
    topics[7].displayFreq2();
    topics[7].displayRank2();
  }

  if (mouseX > 950 && mouseX < 1050 && mouseY > 40 && mouseY < 750) {
    topics[8].see = true;
    topics[8].displayRank2();
    topics[8].displayFreq2();
  } else {
    topics[8].see = false;
    topics[8].displayFreq2();
    topics[8].displayRank2();
  }

  if (mouseX > 1050 && mouseX < 1150 && mouseY > 40 && mouseY < 750) {
    topics[9].see = true;
    topics[9].displayRank2();
    topics[9].displayFreq2();
  } else {
    topics[9].see = false;
    topics[9].displayFreq2();
    topics[9].displayRank2();
  }

  if (mouseX > 1150 && mouseX < 1250 && mouseY > 40 && mouseY < 750) {
    topics[10].see = true;
    topics[10].displayRank2();
    topics[10].displayFreq2();
  } else {
    topics[10].see = false;
    topics[10].displayFreq2();
    topics[10].displayRank2();
  }

  if (mouseX > 1250 && mouseX < 1350 && mouseY > 40 && mouseY < 750) {
    topics[11].see = true;
    topics[11].displayRank2();
    topics[11].displayFreq2();
  } else {
    topics[11].see = false;
    topics[11].displayFreq2();
    topics[11].displayRank2();
  }
}

class Topic {
  // vars
  StringList words;
  String name;
  int x;
  int y;
  int[][] c_size;
  int[][] ranks;
  int did;
  boolean see;

  // initializer
  Topic(String _name, StringList _words, int _x, int _y, int _did, int[][] _c_size, int[][] _ranks, boolean _see) {
    words = _words;
    name = _name;
    x = _x;
    y = _y;
    c_size = _c_size;
    did = _did;
    ranks = _ranks;
    see = _see;
  }
  
  void displayFreq2() {
    for (int i = 0; i < words.size(); i++) {
      int s;
      if (see == false) {
        s = c_size[did][i];
      } else {
        s = 0;
      }
      ellipseMode(CENTER);
      noStroke();
      fill(204, 102, 0);
      int xfaktor = 150;
      int yfaktor = 80;
      ellipse(x + xfaktor, 2 * y * i + yfaktor, s, s);
    }
  }
  
  void displayRank2() {
    for (int i = 0; i < words.size(); i++) {
      int s;
      if (see == true) {
        s = ranks[did][i];
      } else {
        s = 0;
      }
      ellipseMode(CENTER);
      noStroke();
      fill(0, 0, 0);
      int xfaktor = 150;
      int yfaktor = 80;
      ellipse(x + xfaktor, 2 * y * i + yfaktor, s, s);
    }
  }
}

