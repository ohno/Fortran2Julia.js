window.onload = function() {
document.getElementById('input').value =`! Test Cases

program main

  ! hello
  print *, "hello"

  ! arithmetic
  a = 2 + 3
  b = 2 - 3
  c = 2 * 3
  d = 2 / 3
  e = 2.0 / 3.0
  f = 2.0 ** 3.0
  g = 2d0 * (1d0 + 2d0)
  print *, a, b, c, d, e, f, g

  ! do
  do i=1,2
    print *, i
  end do

  ! if
  i = 1
  if (i!=0) then
    print *, 'i != 0'
  end if

end program main`;
document.getElementById('output').value = Fortran2Julia(document.getElementById('input').value);
}