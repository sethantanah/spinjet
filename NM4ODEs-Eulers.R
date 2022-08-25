#Solving the systems of equations with the Euler method

#initial conditions

x_1 = 2
x_2 = -4
x_3 = -2
x_4 = 7
x_5 = 6
t = 0
h = 0.001

U = c()
V = c()
W = c()
Y = c()
Z = c()

interval = seq(1,3,h)
index = 1;



for(i in interval){
  
  u = x_1 + h*(x_2)
  v = x_2 + h*(x_1 - x_3 - (3*x_2)^2 + x_4^3 + 6*x_5 + 2*t) 
  w = x_3 + h*(x_4)
  y = x_4 + h*(x_5)
  z = x_5 + h*(x_5 - x_2 + exp(x_1) - t)
  
  U[index] = u
  V[index] = v
  W[index] = w
  Y[index] = y
  Z[index] = z
  
  
  x_1 = u
  x_2 = v
  x_3 = w
  x_4 = y
  x_5 = z
  
  
  
  index = index+1  
}



tables = data.frame(U, V, W, Y, Z)


tables

