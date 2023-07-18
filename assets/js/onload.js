window.onload = function() {
document.getElementById('input').value =`! Test Cases

program main

  ! type
  implicit none
  integer :: i
  integer :: j
  integer:: a, b, c = 5, d, e, f, g
  integer, parameter :: p = 8, q = 9
  double precision :: x = 1.0, y = 2.0

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
  print *, a, b, c, d, e, f, g, p, q

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