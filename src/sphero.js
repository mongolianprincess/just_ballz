
if (lefthand.pinchStrength > 0.9) {

  while (lefthand.pinchStrength > 0.9)

    orb.setBackLed(255);

    if (righthand.handroll < -0.7) { //spin left incrementally by 5degrees
      heading += 5;
      orb.roll(0, heading);
    }

    if (righthand.handroll > 0.65) { //spin right decrementally by 5degrees
      heading -= 5;
      orb.roll(0, heading);
    }

  orb.setBackLed(0);

}

if (lefthand.pitch > 10 ) {
  speed += 1;
}

if (lefthand.pitch < -10 ) {
  speed -= 1;
}
