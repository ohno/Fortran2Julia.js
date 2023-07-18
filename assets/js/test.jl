# test cases

function main()

  # type
  
  
  
  c = 5
  p = 8; q = 9
  x = 1.0; y = 2.0

  # hello
  println("hello")

  # arithmetic
  a = 2 + 3
  b = 2 - 3
  c = 2 * 3
  d = 2 / 3
  e = 2.0 / 3.0
  f = 2.0 ^ 3.0
  g = 2e0 * (1e0 + 2e0)
  println(a, b, c, d, e, f, g, p, q)

  # do
  for i in 1:2
    println(i)
  end

  # if
  i = 1
  if  (i==0) 
    println("i == 0")
  elseif  (i==1) 
    println("i == 1")
  else
    println("i != 0 .and. i != 1")
  end

end

main()