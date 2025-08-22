# 1、知识点补充
### 1、二分查找
##### 定义：
二分查找（binary search），也称折半搜索（half-interval search）、对数搜索（logarithmic search），是用来在一个**有序数组**中查找某一元素的算法。
##### 原理:
以在一个**升序数组**中查找一个数为例：
每次考察数组当前部分的中间元素，若中间元素恰好是要找的元素，则结束搜索；若中间元素小于所要查找的值，那么左侧的只会更小，不会有所查找的元素，只需到右侧查找；如果中间元素大于所要查找的值，只需到左侧查找。
##### 性质：
**时间复杂度**
最优时间复杂度为 $O(1)$ 。  
二分查找的平均时间复杂度和最坏时间复杂度均为 $O(log \, n)$ 。因为在二分查找过程中，算法每次都把查询的区间减半，所以对于一个长度为 $n$ 的数组，之多会进行 $O(log \, n)$ 次查找。
**空间复杂度**
迭代版本的二分查找的空间复杂度为 $O(1)$ 。
递归（无尾调用消除）版本的二分查找的空间复杂度为 $O(log \, n)$ 。
- ​**什么是“无尾调用消除”？**  (没看懂。)
    ​**尾调用**​（Tail Call）指函数最后一步是调用自身且不需要后续操作（例如 `return binary_search(...)`）。  
    ​**尾调用消除**​（Tail Call Elimination）是编译器优化技术，将尾递归转换为循环，避免递归调用时的栈空间累积。  
    若递归版本无尾调用消除，每次递归都会占用栈帧，空间复杂度为 O(logn)。若有尾调用消除，空间复杂度可优化为 O(1)（类似迭代版本）。

##### 二分查找模板（迭代版本）：
```c++
int binary_search(int start, int end, int key, int arr[]) {
    int ret = -1;
    int mid;
    while(start <= end) { //用while循环实现，是迭代版本
        mid = start + ((end - start) >> 1); //用end-start，避免(end+start)/2可能会造成的溢出
        // 现代编译器中 /2 会自动转换为等效的右移操作 >>1
        if(arr[mid] < key)
            start = mid + 1;
        else if(arr[mid] > key)
            end = mid - 1;
        else {
            ret = mid;
            break;
        }
    }
    return ret;
}
```

### 2、排序
在c++中，使用 std::sort 函数可以对多种数据结构进行排序，包括数组、字符串、vector以及二维vector。一下是详细的使用方法和原理说明：
1、头文件：
```c++
#include<algorithm>
```
2、数组：
升序：默认比较方式（operator）
```c++
int arr[] = {5, 3, 1, 4, 2};
int n = sizeof(arr) / sizeof(arr[0]);
sort(arr, arr + n);
```
降序：使用 greater< Type >()
```c++
sort(arr, arr + n, greater<int>());
```
3、字符串：
字符串本质是字符数组，可直接排序：
```c++
string s = "example";
sort(s.begin(), s.end()); // 升序："aeelmpx"
sort(s.begin(), s.end(), greater<char>()); //降序："xpmleea"
```
4、vector
```c++
vector<int> vec = {5, 3, 1, 4, 2};
sort(vec.begin(), vec.end());
sort(vec.begin(), vec.end(), greater<int>());
```
5、二维vector
(1) 按子vector的某一元素排序
```c++
vector<vector<int>> twoDVec = {{3, 2}, {1, 4}, {2, 3}};
// 按子vector第一个元素升序
sort(twoDVec.begin(), twoDVec.end(), [](const vector<int>& a, const vector<int>& b) {
    return a[0] < b[0];
});
// 排序后：{{1, 4}, {2, 0}, {3, 5}}
```
(2) 按子vector的长度降序排序
```c++
sort(twoDVec.begin(), twoDVec.end(), [](const vector<int>& a, const vector<int>& b) {
    return a.size() > b.size(); //降序
});
// 若子 vector 长度不同：
// {{3, 5, 1}, {1, 4}, {2}} → 排序后：{{3, 5, 1}, {1, 4}, {2}}
```
(3) 按子 vector 的元素和升序排序
```c++
sort(twoDVec.begin(), twoDVec.end(), [](const vector<int)& a, const vectro<int>& b) {
    int sumA = 0, sumB = 0;
    for (int num : a) sumA += num;
    for (int num : b) sumA += num;
    return sumA < sumB;
});
```
(4) 按子 vector 的字典序排序
 ```c++
 vector<vector<int>> vec = {{2, 3}, {2, 1}, {3, 0}};
 // 按字典序升序
 sort(vec.begin(), vec.end());
 // 排序后：{{2, 1}, {2, 3}, {3, 0}}
```
……（看不懂，好多啊）

# 2、 题解
思路：除solve函数外另加两个函数：一个用来二分查找最低限重，另一个用于判断找到的最低限重是否可以可以在限制次数内运输完毕。
代码如下：
```c++
#include<bits/stdc++.h>
using namespace std;
typedef long long ll, LL;
#define pb push_back
  
bool valid(int ans, int c, int n, vector<int> s) {
    ll count = 1, weight = 0;
    for (int i = 0; i < n; i++) {
        weight += s[i];
        if(weight > ans) { //若装不下，则另开一趟
            count ++;
            weight = s[i];
        }
        if(count > c) return false; // 如果运送次数大于规定次数，则不符合要求
    }
    return true;
}

int bs(int max, int c, int n, vector<int> s) {
    int res = -1;
    ll l = max, r = 1e9, mid;
    while(l <= r) {
        mid = l + ((r - l) >> 1);
        if (valid(mid, c, n, s)) {
            res = mid;
            r = mid - 1;
        }
        else {
            l = mid + 1;
        }
    }
    return res;
}

void solve() {
    int n ,c;
    cin >> n >> c;
    int a, max = -1;
    vector<int> s;
    for (int i = 0; i < n; i++) {
        cin >> a;
        s.pb(a);
        if (a > max) max = a;
    }
    int ans = bs(max, c, n, s);
    cout << ans;
}

int main() {
    ios::sync_with_stdio(false);
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
