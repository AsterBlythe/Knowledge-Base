# 1、知识点补充
##### 小知识点：
定理（牛顿-莱布尼茨公式/微积分基本定理）：如果 $F(x)$ 是连续函数 $f(x)$ 在区间 $[a, b]$ 上的一个原函数（即 $F'(x)=f(x)$ )，那么
$$\int_a^b f(x)\mathrm{d}x=F(b)-F(a)$$
该公式的右侧有时也写作 $F(x)|_a^b$ 
该公式给出了用原函数计算定积分的方法，是一个用于计算的重要积分公式，也是分析学的一个基本公式。如果将公式拓展至无穷区间，或者在区间边界无界的情形，牛顿-莱布尼茨公式有时也成立，此时的定积分被称为“反常积分”或“瑕积分”。
#### ①求两函数围成的面积：（定积分）
1、在 $x\in(a, b)$ 范围内，函数 $f(x)$ 与函数 $g(x)$（$f(x)\ge g(x)$ )及直线 $x=a$ 、 $x=b$ 所围成的面积为：
$$S=\int_a^b\left[f(x)-g(x)\right]\mathrm{d}x$$
也就是两函数的积分相减：
$$S = [F(b)-G(b)]-[F(a)-G(a)]$$
也为：
$$S = [F(b)-F(a)]-[G(b)-G(a)]$$

（图像上 $f(x)$ 在上，$g(x)$ 在下）

2、在 $y\in(c, d)$ 范围内，函数 $x=\phi (y)$ 与函数 $x=\psi(y)$ （$\psi(y)\ge \phi(y)$）及直线 $y=c$ 、 $y=d$ 所围成的面积为：
$$S=\int_c^d [\psi(y)-\phi(y)]\mathrm{d}y$$
也就是两函数在y上的积分相减：
$$S=[\Psi(d)-\Phi(d)]-[\Psi(c)-\Phi(c)]$$
也为：
$$S=[\Psi(d)-\Psi(c)]-[\Phi(d)-\Phi(c)]$$
（图像上 $\psi(y)$ 在右， $\phi(y)$ 在左）

#### ②微积分的思想：
微积分的核心思想是通过 ​**无限分割与求和** 计算整体量（如面积、体积）。具体步骤：

1. ​**分割**：将区域分割为无数个微小矩形（宽度为 dx 或高度为 dy）。
2. ​**近似**：每个微小矩形的面积近似为 $[f(x)−g(x)]\mathrm{d}x$ 或 $[ψ(y)−ϕ(y)]\mathrm{d}y$。
3. ​**求和**：对全体微小面积求和，即 ​**定积分**。
4. ​**取极限**：通过极限过程使分割无限细，得到精确面积。

根据无线分割与求和思想，在我们用程序计算两函数围成的面积时也可将面积分割成尽可能小的固定宽度（或以y轴为准的长度）后求和累加，当宽度足够小时可以保证误差在可接受范围内。

# 2、题解
#### 1、利用数值积分法求
 时间复杂度为O$\left( \frac{r-1}{h} \right)$ , 本题取h为 $10^{-4}$ ， 复杂度为O$(2*10^6)$ ， 可以接受
 （马学长发的代码）
 ```c++
 #include<bits/stdc++.h>
using namespace std;
typedef long long ll, LL;
#define pb push_back
  
void solve() {
    int a, b, c, n, m;
    cin >> a >> b >> c >> n >> m;
    double x1 = ((n - b) + sqrt((b - n) * (b - n) - 4 * a * (c - m))) / (2 * a);
    double x2 = ((n - b) - sqrt((b - n) * (b - n) - 4 * a * (c - m))) / (2 * a);
    double ans = 0;
    if(x1 > x2) swap(x1, x2);
    for(double i = x1; i <= x2; i += 0.0001) {
        double y1 = a * i * i + b * i + c;
        double y2 = n * i + m;
        double h = abs(y1 - y2);
        ans += (0.0001 * h);
    }
    printf("%.4f", ans);
}

int main() {
    // ios::sync_with_stdio(false); //会关闭c++流与c标准流的同步
    //关闭后cin和scanf的输入顺序可能混乱（如输入数据错位）
    //关闭后cout和printf的输出循序可能混乱（如输出内容穿插错乱
    //若同时使用cin/cout和scanf/printf，必须注释掉
    cin.tie(0); //解除cin与cout的绑定，避免每次cin操作前自动酸辛cout缓冲区
    cout.tie(0); //通常无实际效果（cout默认不绑定其他流）
    int t = 1;
    // cin << t;
    while(t--) {
        solve();
    }

    return 0;
}
```

#### 2、积分法求：
时间复杂度O(1)
```C++
#include<bits/stdc++.h>
using namespace std;
typedef long long ll, LL;
#define pb push_back

void solve() {
    int a, b, c, n, m;
    cin >> a >> b >> c >> n >> m;
    double x1 = ((n - b) + sqrt(pow((b - n), 2) - 4 * a * (c - m))) / (2 * a);
    double x2 = ((n - b) - sqrt(pow((b - n), 2) - 4 * a * (c - m))) / (2 * a);
    double ans_1 = (1.0 / 3) * a * x1*x1*x1 + 0.5 * (b - n) * pow(x1, 2) + (c - m) * x1;
    double ans_2 = (1.0 / 3) * a * x2*x2*x2 + 0.5 * (b - n) * pow(x2, 2) + (c - m) * x2;
    //易错点：（1/3）是int类型计算，结果为0，应改为（1.0/3）或（1/3.0）
    double ans = abs(ans_1 - ans_2);
    printf("%.4f", ans);
}

int main() {
    // ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    int t = 1;
    // cin << t;
    while(t--) {
        solve();
    }

    return 0;
}
```