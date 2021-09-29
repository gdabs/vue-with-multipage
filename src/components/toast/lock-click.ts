let lockCount = 0;

export function lockClick(lock: boolean) {
  if (lock) {
    if (!lockCount) {
      document.body.classList.add('pant-toast--unclickable');
    }

    lockCount++;
  } else if (lockCount) {
    lockCount--;

    if (!lockCount) {
      document.body.classList.remove('pant-toast--unclickable');
    }
  }
}
