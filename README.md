a classic game named 2048

1，使用多层canvas来减少重绘的性能损耗

2，使用transform替代margin-left和margin-top来提高性能

3，使用path2D进行缓存来提高绘制性能，将画布的函数调用集合到一起（例如，画一条折线，而不要画多条分开的直线）

4，对游戏的算法进行优化，提高效率

5，用整数坐标代替浮点，减少运算量

6，尽可能避免使用text rendering


