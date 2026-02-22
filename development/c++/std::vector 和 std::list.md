# C++ std::vector 和 std::list 完全指南

## 目录
1. [基本操作对比](#1-基本操作对比)
2. [插入和删除操作](#2-插入和删除操作)
3. [特有操作](#3-特有操作)
4. [迭代器操作](#4-迭代器操作)
5. [遍历方式对比](#5-遍历方式对比)
6. [容量管理](#6-容量管理)
7. [emplace 系列操作](#7-emplace-系列操作)
8. [算法操作](#8-算法操作)
9. [实用示例](#9-实用示例)
10. [性能对比](#10-性能对比)
11. [选择建议](#11-选择建议)

---

## 1. 基本操作对比

```cpp
#include <iostream>
#include <vector>
#include <list>
using namespace std;

void printVector(const vector<int>& v) {
    for (int x : v) cout << x << " ";
    cout << endl;
}

void printList(const list<int>& l) {
    for (int x : l) cout << x << " ";
    cout << endl;
}

int main() {
    cout << "========== 1. 基本操作对比 ==========" << endl;
    
    // ----- vector 示例 -----
    cout << "\n--- vector 基本操作 ---" << endl;
    vector<int> vec;
    
    // 添加元素
    vec.push_back(10);        // 末尾添加: [10]
    vec.push_back(20);        // [10, 20]
    vec.push_back(30);        // [10, 20, 30]
    cout << "push_back后: ";
    printVector(vec);
    
    // 访问元素
    cout << "vec[0]: " << vec[0] << endl;           // 直接索引: 10
    cout << "vec.at(1): " << vec.at(1) << endl;     // 带边界检查: 20
    cout << "vec.front(): " << vec.front() << endl; // 第一个: 10
    cout << "vec.back(): " << vec.back() << endl;   // 最后一个: 30
    
    // 删除元素
    vec.pop_back();           // 删除末尾: [10, 20]
    cout << "pop_back后: ";
    printVector(vec);
    
    // ----- list 示例 -----
    cout << "\n--- list 基本操作 ---" << endl;
    list<int> lst;
    
    // 添加元素（双向操作）
    lst.push_back(10);        // 末尾添加: [10]
    lst.push_back(20);        // [10, 20]
    lst.push_front(5);        // 开头添加: [5, 10, 20]
    cout << "push系列后: ";
    printList(lst);
    
    // 访问元素（不能直接索引）
    cout << "lst.front(): " << lst.front() << endl; // 第一个: 5
    cout << "lst.back(): " << lst.back() << endl;   // 最后一个: 20
    
    // 删除元素
    lst.pop_back();           // 删除末尾: [5, 10]
    lst.pop_front();          // 删除开头: [10]
    cout << "pop系列后: ";
    printList(lst);
    
    return 0;
}
```

## 2. 插入和删除操作

```cpp
#include <iostream>
#include <vector>
#include <list>
#include <iterator>
using namespace std;

void printVector(const vector<int>& v, const string& msg) {
    cout << msg << ": ";
    for (int x : v) cout << x << " ";
    cout << endl;
}

void printList(const list<int>& l, const string& msg) {
    cout << msg << ": ";
    for (int x : l) cout << x << " ";
    cout << endl;
}

int main() {
    cout << "\n========== 2. 插入和删除操作 ==========" << endl;
    
    // ----- vector 插入删除（较慢）-----
    cout << "\n--- vector 插入删除 ---" << endl;
    vector<int> vec = {1, 2, 3, 4, 5};
    printVector(vec, "原始 vector");
    
    // insert: 在指定位置插入
    auto vit = vec.begin() + 2;     // 指向第3个元素
    vec.insert(vit, 99);             // 在位置2插入
    printVector(vec, "insert 99在位置2");
    
    // erase: 删除指定位置
    vit = vec.begin() + 3;
    vec.erase(vit);                   // 删除位置3
    printVector(vec, "erase 位置3");
    
    // insert 多个元素
    vit = vec.begin() + 1;
    vec.insert(vit, 3, 88);           // 插入3个88
    printVector(vec, "insert 3个88在位置1");
    
    // insert 迭代器范围
    vector<int> temp = {100, 200};
    vit = vec.end();
    vec.insert(vit, temp.begin(), temp.end());
    printVector(vec, "insert 范围在末尾");
    
    // erase 范围
    vec.erase(vec.begin() + 1, vec.begin() + 4);
    printVector(vec, "erase 范围[1,4)");
    
    // ----- list 插入删除（快速）-----
    cout << "\n--- list 插入删除 ---" << endl;
    list<int> lst = {1, 2, 3, 4, 5};
    printList(lst, "原始 list");
    
    // insert: 在指定位置插入
    auto lit = lst.begin();
    advance(lit, 2);                  // 移动到第3个元素
    lst.insert(lit, 99);               // 在位置2插入
    printList(lst, "insert 99在位置2");
    
    // erase: 删除指定位置
    lit = lst.begin();
    advance(lit, 3);
    lst.erase(lit);                    // 删除位置3
    printList(lst, "erase 位置3");
    
    // insert 多个元素
    lit = lst.begin();
    advance(lit, 1);
    lst.insert(lit, 3, 88);            // 插入3个88
    printList(lst, "insert 3个88在位置1");
    
    // insert 迭代器范围
    list<int> temp2 = {100, 200};
    lit = lst.end();
    lst.insert(lit, temp2.begin(), temp2.end());
    printList(lst, "insert 范围在末尾");
    
    // erase 范围
    lit = lst.begin();
    auto lit2 = lst.begin();
    advance(lit, 1);
    advance(lit2, 4);
    lst.erase(lit, lit2);              // 删除范围
    printList(lst, "erase 范围[1,4)");
    
    return 0;
}
```

## 3. 特有操作

```cpp
#include <iostream>
#include <vector>
#include <list>
using namespace std;

void printList(const list<int>& l, const string& msg) {
    cout << msg << ": ";
    for (int x : l) cout << x << " ";
    cout << endl;
}

int main() {
    cout << "\n========== 3. 特有操作 ==========" << endl;
    
    // ----- vector 特有操作 -----
    cout << "\n--- vector 特有操作 ---" << endl;
    vector<int> vec;
    
    // reserve: 预分配空间
    vec.reserve(100);
    cout << "reserve(100)后 capacity: " << vec.capacity() << endl;
    
    // capacity: 获取当前容量
    for (int i = 0; i < 10; i++) vec.push_back(i);
    cout << "size: " << vec.size() << ", capacity: " << vec.capacity() << endl;
    
    // shrink_to_fit: 释放多余内存
    vec.shrink_to_fit();
    cout << "shrink_to_fit后 capacity: " << vec.capacity() << endl;
    
    // data: 获取底层数组指针
    int* ptr = vec.data();
    cout << "data()[0]: " << ptr[0] << endl;
    
    // assign: 重新赋值
    vec.assign(5, 100);  // 5个100
    cout << "assign(5,100)后: ";
    for (int x : vec) cout << x << " ";
    cout << endl;
    
    // ----- list 特有操作 -----
    cout << "\n--- list 特有操作 ---" << endl;
    
    // merge: 合并两个已排序的list
    list<int> list1 = {1, 3, 5, 7};
    list<int> list2 = {2, 4, 6, 8};
    list1.merge(list2);  // list1必须已排序
    printList(list1, "merge后 list1");
    cout << "list2大小: " << list2.size() << endl;
    
    // splice: 转移元素
    list<int> list3 = {10, 20, 30};
    list<int> list4 = {40, 50, 60};
    auto it = list3.begin();
    advance(it, 2);
    list3.splice(it, list4);  // 将list4所有元素转移到list3的it位置前
    printList(list3, "splice后 list3");
    cout << "list4大小: " << list4.size() << endl;
    
    // remove: 删除特定值
    list<int> list5 = {1, 2, 2, 3, 2, 4, 2};
    list5.remove(2);
    printList(list5, "remove(2)后");
    
    // remove_if: 条件删除
    list<int> list6 = {1, 2, 3, 4, 5, 6, 7, 8};
    list6.remove_if([](int n) { return n % 2 == 0; });  // 删除偶数
    printList(list6, "remove_if(偶数)后");
    
    // unique: 去重
    list<int> list7 = {1, 1, 2, 2, 2, 3, 3, 4};
    list7.unique();
    printList(list7, "unique去重后");
    
    // reverse: 反转
    list<int> list8 = {1, 2, 3, 4, 5};
    list8.reverse();
    printList(list8, "reverse反转后");
    
    // sort: 排序
    list<int> list9 = {5, 2, 8, 1, 9, 3};
    list9.sort();
    printList(list9, "sort排序后");
    
    // sort 降序
    list9.sort(greater<int>());
    printList(list9, "sort降序后");
    
    return 0;
}
```

## 4. 迭代器操作

```cpp
#include <iostream>
#include <vector>
#include <list>
#include <iterator>
using namespace std;

int main() {
    cout << "\n========== 4. 迭代器操作 ==========" << endl;
    
    vector<int> vec = {10, 20, 30, 40, 50};
    list<int> lst = {10, 20, 30, 40, 50};
    
    // ----- advance: 移动迭代器 -----
    cout << "\n--- advance 用法 ---" << endl;
    
    // vector 中使用（O(1)）
    auto vit = vec.begin();
    advance(vit, 3);  // vit += 3;  vector的迭代器可以+; list的不可以
    cout << "vector advance到位置3: " << *vit << endl;  // 40
    
    // list 中使用（O(n)）
    auto lit = lst.begin();
    advance(lit, 3);
    cout << "list advance到位置3: " << *lit << endl;    // 40
    
    // 向后移动（双向迭代器支持负数）
    advance(lit, -2);
    cout << "list advance向后2步: " << *lit << endl;    // 20
    
    // ----- next: 返回新迭代器 -----
    cout << "\n--- next 用法 ---" << endl;
    
    auto vit2 = vec.begin();
    auto vit3 = next(vit2, 3);  // vit2不变，vit3指向位置3
    cout << "next后原迭代器: " << *vit2 << endl;        // 10
    cout << "next返回新迭代器: " << *vit3 << endl;       // 40
    
    // ----- prev: 向后移动返回新迭代器 -----
    cout << "\n--- prev 用法 ---" << endl;
    
    auto vit4 = vec.end();
    auto vit5 = prev(vit4, 2);
    cout << "prev从end向前2步: " << *vit5 << endl;       // 40
    
    // ----- 迭代器距离计算 -----
    cout << "\n--- 距离计算 ---" << endl;
    
    auto start = lst.begin();
    auto end = lst.end();
    int dist = distance(start, end);
    cout << "list 元素个数: " << dist << endl;           // 5
    
    auto mid = next(start, dist / 2);
    cout << "中间元素: " << *mid << endl;                // 30
    
    // ----- 不同迭代器类型对比 -----
    cout << "\n--- 迭代器类型对比 ---" << endl;
    
    // vector: 随机访问迭代器
    cout << "vector随机访问: " << *(vec.begin() + 2) << endl;  // ✅ 30
    
    // list: 双向迭代器
    // cout << *(lst.begin() + 2);  // ❌ 编译错误
    
    return 0;
}
```

## 5. 遍历方式对比

```cpp
#include <iostream>
#include <vector>
#include <list>
using namespace std;

int main() {
    cout << "\n========== 5. 遍历方式对比 ==========" << endl;
    
    vector<int> vec = {1, 2, 3, 4, 5};
    list<int> lst = {1, 2, 3, 4, 5};
    
    // ----- vector 遍历方式 -----
    cout << "\n--- vector 遍历 ---" << endl;
    
    // 1. 索引遍历（只适用于vector）
    cout << "索引遍历: ";
    for (size_t i = 0; i < vec.size(); ++i) {
        cout << vec[i] << " ";
    }
    cout << endl;
    
    // 2. 迭代器遍历
    cout << "迭代器遍历: ";
    for (auto it = vec.begin(); it != vec.end(); ++it) {
        cout << *it << " ";
    }
    cout << endl;
    
    // 3. 范围for循环
    cout << "范围for: ";
    for (int x : vec) {
        cout << x << " ";
    }
    cout << endl;
    
    // 4. 常量迭代器
    cout << "const迭代器: ";
    for (auto it = vec.cbegin(); it != vec.cend(); ++it) {
        cout << *it << " ";
    }
    cout << endl;
    
    // 5. 反向迭代器
    cout << "反向迭代器: ";
    for (auto rit = vec.rbegin(); rit != vec.rend(); ++rit) {
        cout << *rit << " ";
    }
    cout << endl;
    
    // ----- list 遍历方式 -----
    cout << "\n--- list 遍历 ---" << endl;
    
    // 1. 迭代器遍历（不能使用索引）
    cout << "迭代器遍历: ";
    for (auto it = lst.begin(); it != lst.end(); ++it) {
        cout << *it << " ";
    }
    cout << endl;
    
    // 2. 范围for循环
    cout << "范围for: ";
    for (int x : lst) {
        cout << x << " ";
    }
    cout << endl;
    
    // 3. 反向遍历
    cout << "反向遍历: ";
    for (auto rit = lst.rbegin(); rit != lst.rend(); ++rit) {
        cout << *rit << " ";
    }
    cout << endl;
    
    // 4. 使用auto遍历（修改元素）
    cout << "修改元素: ";
    for (auto& x : lst) {
        x *= 2;
    }
    for (int x : lst) cout << x << " ";
    cout << endl;
    
    return 0;
}
```

## 6. 容量管理

```cpp
#include <iostream>
#include <vector>
#include <list>
using namespace std;

int main() {
    cout << "\n========== 6. 容量管理 ==========" << endl;
    
    // ----- vector 容量管理 -----
    cout << "\n--- vector 容量管理 ---" << endl;
    
    vector<int> vec;
    
    cout << "初始: size=" << vec.size() 
         << ", capacity=" << vec.capacity() << endl;
    
    // reserve: 预分配空间
    vec.reserve(10);
    cout << "reserve(10)后: capacity=" << vec.capacity() << endl;
    
    // 添加元素观察容量增长
    for (int i = 0; i < 15; i++) {
        vec.push_back(i);
        cout << "size=" << vec.size() 
             << ", capacity=" << vec.capacity() << endl;
    }
    
    // shrink_to_fit: 释放多余内存
    vec.shrink_to_fit();
    cout << "shrink_to_fit后: capacity=" << vec.capacity() << endl;
    
    // resize: 调整大小
    vec.resize(5);  // 缩小
    cout << "resize(5)后: size=" << vec.size() << endl;
    
    vec.resize(8, 100);  // 扩大并用100填充
    cout << "resize(8,100)后: ";
    for (size_t i = 5; i < vec.size(); i++) {
        cout << vec[i] << " ";
    }
    cout << endl;
    
    // empty: 检查是否为空
    cout << "vec为空? " << (vec.empty() ? "是" : "否") << endl;
    
    // max_size: 最大可能大小
    cout << "max_size: " << vec.max_size() << endl;
    
    // ----- list 容量管理 -----
    cout << "\n--- list 容量管理 ---" << endl;
    
    list<int> lst;
    
    cout << "初始: size=" << lst.size() << endl;
    cout << "为空? " << (lst.empty() ? "是" : "否") << endl;
    
    // list没有capacity()和reserve()，因为节点动态分配
    lst.resize(5, 10);
    cout << "resize(5,10)后: ";
    for (int x : lst) cout << x << " ";
    cout << " (size=" << lst.size() << ")" << endl;
    
    lst.resize(3);
    cout << "resize(3)后: ";
    for (int x : lst) cout << x << " ";
    cout << " (size=" << lst.size() << ")" << endl;
    
    return 0;
}
```

## 7. emplace 系列操作

```cpp
#include <iostream>
#include <vector>
#include <list>
#include <string>
using namespace std;

// 辅助类用于观察构造过程
class Person {
public:
    string name;
    int age;
    
    // 构造函数
    Person(string n, int a) : name(n), age(a) {
        cout << "构造: " << name << endl;
    }
    
    // 拷贝构造函数
    Person(const Person& other) : name(other.name), age(other.age) {
        cout << "拷贝: " << name << endl;
    }
    
    // 移动构造函数
    Person(Person&& other) noexcept : name(move(other.name)), age(other.age) {
        cout << "移动: " << name << endl;
    }
    
    // 析构函数
    ~Person() {
        if (!name.empty()) {
            cout << "析构: " << name << endl;
        }
    }
};

int main() {
    cout << "\n========== 7. emplace 系列操作 ==========" << endl;
    
    // ----- vector emplace_back vs push_back -----
    cout << "\n--- vector emplace_back 对比 push_back ---" << endl;
    
    vector<Person> vec1;
    cout << "push_back: 先创建临时对象" << endl;
    vec1.push_back(Person("Alice", 25));
    
    cout << "\nemplace_back: 直接在容器中构造" << endl;
    vector<Person> vec2;
    vec2.emplace_back("Bob", 30);  // 直接传递构造参数
    
    // ----- emplace_back 返回引用 -----
    cout << "\n--- emplace_back 返回引用 ---" << endl;
    
    vector<Person> vec3;
    Person& p = vec3.emplace_back("Charlie", 35);
    p.age = 36;  // 直接修改
    cout << "修改后年龄: " << vec3[0].age << endl;
    
    // ----- list emplace 系列 -----
    cout << "\n--- list emplace 操作 ---" << endl;
    
    list<Person> lst;
    
    // emplace_back: 末尾构造
    lst.emplace_back("David", 40);
    
    // emplace_front: 开头构造
    lst.emplace_front("Eve", 28);
    
    // emplace: 指定位置构造
    auto it = lst.begin();
    advance(it, 1);
    lst.emplace(it, "Frank", 32);
    
    cout << "list 元素: ";
    for (const auto& person : lst) {
        cout << person.name << "(" << person.age << ") ";
    }
    cout << endl;
    
    // ----- emplace 与 insert 对比 -----
    cout << "\n--- emplace vs insert ---" << endl;
    
    vector<pair<int, string>> vec_pair;
    
    // insert: 需要先创建对象
    vec_pair.insert(vec_pair.begin(), make_pair(1, "one"));
    
    // emplace: 直接传递构造参数
    vec_pair.emplace(vec_pair.begin(), 2, "two");
    
    // emplace_back: 更简洁
    vec_pair.emplace_back(3, "three");
    
    cout << "vector<pair>: ";
    for (const auto& p : vec_pair) {
        cout << "(" << p.first << "," << p.second << ") ";
    }
    cout << endl;
    
    // ----- emplace 在复杂容器中的使用 -----
    cout << "\n--- emplace 高级用法 ---" << endl;
    
    // 在 map 中使用
    map<int, Person> personMap;
    personMap.emplace(1, "Grace", 27);  // 直接在map中构造
    
    // 容器嵌套
    vector<list<Person>> complexVec;
    auto& innerList = complexVec.emplace_back();  // 构造空的list
    innerList.emplace_back("Henry", 33);
    
    return 0;
}
```

## 8. 算法操作

```cpp
#include <iostream>
#include <vector>
#include <list>
#include <algorithm>
#include <numeric>
using namespace std;

void printVector(const vector<int>& v, const string& msg) {
    cout << msg << ": ";
    for (int x : v) cout << x << " ";
    cout << endl;
}

int main() {
    cout << "\n========== 8. 算法操作 ==========" << endl;
    
    vector<int> vec = {5, 2, 8, 1, 9, 3, 7, 4, 6};
    printVector(vec, "原始数据");
    
    // ----- 排序算法 -----
    cout << "\n--- 排序算法 ---" << endl;
    
    // sort: 排序（只适用于vector）
    sort(vec.begin(), vec.end());
    printVector(vec, "sort升序");
    
    sort(vec.begin(), vec.end(), greater<int>());
    printVector(vec, "sort降序");
    
    // partial_sort: 部分排序
    vector<int> vec2 = {5, 2, 8, 1, 9, 3, 7, 4, 6};
    partial_sort(vec2.begin(), vec2.begin() + 4, vec2.end());
    printVector(vec2, "partial_sort前4个");
    
    // nth_element: 第n大的元素放对位置
    vector<int> vec3 = {5, 2, 8, 1, 9, 3, 7, 4, 6};
    nth_element(vec3.begin(), vec3.begin() + 4, vec3.end());
    printVector(vec3, "nth_element(第5大的放对位置)");
    
    // ----- 查找算法 -----
    cout << "\n--- 查找算法 ---" << endl;
    
    // find: 查找元素
    auto it = find(vec.begin(), vec.end(), 5);
    if (it != vec.end()) {
        cout << "找到5，位置: " << distance(vec.begin(), it) << endl;
    }
    
    // binary_search: 二分查找（需要有序）
    if (binary_search(vec.begin(), vec.end(), 5)) {
        cout << "二分查找找到5" << endl;
    }
    
    // lower_bound/upper_bound: 边界查找
    auto low = lower_bound(vec.begin(), vec.end(), 5);
    auto up = upper_bound(vec.begin(), vec.end(), 5);
    cout << "lower_bound(5): 位置" << distance(vec.begin(), low) << endl;
    cout << "upper_bound(5): 位置" << distance(vec.begin(), up) << endl;
    
    // ----- 修改算法 -----
    cout << "\n--- 修改算法 ---" << endl;
    
    // reverse: 反转
    vector<int> vec4 = {1, 2, 3, 4, 5};
    reverse(vec4.begin(), vec4.end());
    printVector(vec4, "reverse反转");
    
    // rotate: 旋转
    rotate(vec4.begin(), vec4.begin() + 2, vec4.end());
    printVector(vec4, "rotate左移2位");
    
    // replace: 替换
    replace(vec4.begin(), vec4.end(), 3, 99);
    printVector(vec4, "replace(3->99)");
    
    // fill: 填充
    fill(vec4.begin(), vec4.end(), 0);
    printVector(vec4, "fill(0)");
    
    // ----- 删除算法 -----
    cout << "\n--- 删除算法 ---" << endl;
    
    vector<int> vec5 = {1, 2, 2, 3, 2, 4, 2, 5};
    
    // remove: 逻辑删除（需要配合erase）
    auto new_end = remove(vec5.begin(), vec5.end(), 2);
    vec5.erase(new_end, vec5.end());
    printVector(vec5, "remove+erase删除2");
    
    // unique: 去重（需要配合erase）
    vector<int> vec6 = {1, 1, 2, 2, 2, 3, 3, 4};
    new_end = unique(vec6.begin(), vec6.end());
    vec6.erase(new_end, vec6.end());
    printVector(vec6, "unique+erase去重");
    
    // ----- 数值算法 -----
    cout << "\n--- 数值算法 ---" << endl;
    
    vector<int> vec7 = {1, 2, 3, 4, 5};
    
    // accumulate: 求和
    int sum = accumulate(vec7.begin(), vec7.end(), 0);
    cout << "sum = " << sum << endl;
    
    // inner_product: 内积
    vector<int> vec8 = {5, 4, 3, 2, 1};
    int product = inner_product(vec7.begin(), vec7.end(), vec8.begin(), 0);
    cout << "内积 = " << product << endl;
    
    // partial_sum: 部分和
    vector<int> result(vec7.size());
    partial_sum(vec7.begin(), vec7.end(), result.begin());
    printVector(result, "部分和");
    
    // adjacent_difference: 相邻差
    adjacent_difference(vec7.begin(), vec7.end(), result.begin());
    printVector(result, "相邻差");
    
    return 0;
}
```

## 9. 实用示例

```cpp
#include <iostream>
#include <vector>
#include <list>
#include <string>
#include <algorithm>
#include <random>
using namespace std;

// 学生类
class Student {
public:
    string name;
    int id;
    double score;
    
    Student(string n, int i, double s) : name(n), id(i), score(s) {}
    
    void print() const {
        cout << "[" << id << "] " << name << ": " << score;
    }
};

// 游戏实体类
class GameObject {
public:
    string type;
    int x, y;
    bool active;
    
    GameObject(string t, int x, int y) : type(t), x(x), y(y), active(true) {}
    
    void update() {
        // 更新逻辑
    }
};

int main() {
    cout << "\n========== 9. 实用示例 ==========" << endl;
    
    // ----- 示例1：学生成绩管理系统（使用vector）-----
    cout << "\n--- 学生成绩管理系统 ---" << endl;
    
    vector<Student> students;
    
    // 添加学生
    students.emplace_back("Alice", 1001, 85.5);
    students.emplace_back("Bob", 1002, 92.0);
    students.emplace_back("Charlie", 1003, 78.5);
    students.emplace_back("David", 1004, 88.0);
    students.emplace_back("Eve", 1005, 95.5);
    
    // 按分数排序
    sort(students.begin(), students.end(), 
         [](const Student& a, const Student& b) {
             return a.score > b.score;
         });
    
    cout << "成绩排名:" << endl;
    for (size_t i = 0; i < students.size(); i++) {
        cout << i+1 << ". ";
        students[i].print();
        cout << endl;
    }
    
    // 查找特定分数段的学生
    double threshold = 90.0;
    auto it = find_if(students.begin(), students.end(),
                      [threshold](const Student& s) { return s.score >= threshold; });
    
    cout << "\n90分以上的学生:" << endl;
    while (it != students.end() && it->score >= threshold) {
        cout << "  ";
        it->print();
        cout << endl;
        ++it;
    }
    
    // 计算平均分
    double avg = accumulate(students.begin(), students.end(), 0.0,
                           [](double sum, const Student& s) { return sum + s.score; }) 
                / students.size();
    cout << "\n平均分: " << avg << endl;
    
    // ----- 示例2：待办事项列表（使用list）-----
    cout << "\n--- 待办事项列表 ---" << endl;
    
    list<string> todoList = {
        "完成报告",
        "开会讨论",
        "回复邮件",
        "代码审查",
        "更新文档"
    };
    
    cout << "今日待办:" << endl;
    int num = 1;
    for (const auto& task : todoList) {
        cout << num++ << ". " << task << endl;
    }
    
    // 在中间插入紧急任务
    auto taskIt = todoList.begin();
    advance(taskIt, 2);
    todoList.emplace(taskIt, "【紧急】修复线上bug");
    
    // 完成任务后删除
    taskIt = todoList.begin();
    advance(taskIt, 1);
    todoList.erase(taskIt);  // 删除"开会讨论"
    
    cout << "\n更新后的待办:" << endl;
    num = 1;
    for (const auto& task : todoList) {
        cout << num++ << ". " << task << endl;
    }
    
    // ----- 示例3：游戏对象管理（混合使用）-----
    cout << "\n--- 游戏对象管理 ---" << endl;
    
    // 使用vector存储所有游戏对象（适合遍历更新）
    vector<GameObject> gameObjects;
    
    // 添加各种游戏对象
    gameObjects.emplace_back("player", 10, 20);
    gameObjects.emplace_back("enemy", 50, 30);
    gameObjects.emplace_back("enemy", 60, 35);
    gameObjects.emplace_back("item", 25, 15);
    gameObjects.emplace_back("npc", 40, 25);
    
    cout << "游戏对象数量: " << gameObjects.size() << endl;
    
    // 批量更新所有对象
    for (auto& obj : gameObjects) {
        obj.update();
    }
    
    // 使用list存储活跃敌人（适合频繁删除）
    list<GameObject*> activeEnemies;
    for (auto& obj : gameObjects) {
        if (obj.type == "enemy") {
            activeEnemies.push_back(&obj);
        }
    }
    
    cout << "活跃敌人数量: " << activeEnemies.size() << endl;
    
    // 敌人被击败时从list中删除
    auto enemyIt = activeEnemies.begin();
    advance(enemyIt, 1);  // 第二个敌人被击败
    activeEnemies.erase(enemyIt);
    
    cout << "击败一个敌人后剩余: " << activeEnemies.size() << endl;
    
    // ----- 示例4：数据缓冲区（展示vector优势）-----
    cout << "\n--- 数据缓冲区 ---" << endl;
    
    vector<char> buffer;
    buffer.reserve(1024);  // 预分配1KB空间
    
    // 模拟接收数据
    for (int i = 0; i < 10; i++) {
        buffer.push_back('A' + i);
    }
    
    cout << "缓冲区数据: ";
    for (char c : buffer) cout << c;
    cout << endl;
    
    // 随机访问缓冲区数据
    cout << "第5个字节: " << buffer[4] << endl;
    
    // 清空缓冲区
    buffer.clear();
    cout << "清空后大小: " << buffer.size() << endl;
    
    return 0;
}
```

## 10. 性能对比

```cpp
#include <iostream>
#include <vector>
#include <list>
#include <chrono>
#include <random>
using namespace std;

// 计时器类
class Timer {
private:
    chrono::high_resolution_clock::time_point start;
    string name;
    
public:
    Timer(const string& n) : name(n) {
        start = chrono::high_resolution_clock::now();
    }
    
    ~Timer() {
        auto end = chrono::high_resolution_clock::now();
        auto duration = chrono::duration_cast<chrono::microseconds>(end - start);
        cout << name << ": " << duration.count() << " μs" << endl;
    }
};

int main() {
    cout << "\n========== 10. 性能对比 ==========" << endl;
    
    const int SIZE = 100000;
    const int TESTS = 10000;
    
    // ----- 1. 尾部插入性能 -----
    cout << "\n--- 尾部插入性能 ---" << endl;
    
    {
        Timer t("vector push_back");
        vector<int> vec;
        vec.reserve(SIZE);
        for (int i = 0; i < SIZE; i++) {
            vec.push_back(i);
        }
    }
    
    {
        Timer t("list push_back");
        list<int> lst;
        for (int i = 0; i < SIZE; i++) {
            lst.push_back(i);
        }
    }
    
    // ----- 2. 头部插入性能 -----
    cout << "\n--- 头部插入性能 ---" << endl;
    
    {
        Timer t("vector insert(begin)");
        vector<int> vec;
        for (int i = 0; i < TESTS; i++) {
            vec.insert(vec.begin(), i);
        }
    }
    
    {
        Timer t("list push_front");
        list<int> lst;
        for (int i = 0; i < TESTS; i++) {
            lst.push_front(i);
        }
    }
    
    // ----- 3. 中间插入性能 -----
    cout << "\n--- 中间插入性能 ---" << endl;
    
    {
        Timer t("vector insert(mid)");
        vector<int> vec(SIZE, 0);
        auto it = vec.begin() + SIZE/2;
        for (int i = 0; i < TESTS; i++) {
            vec.insert(it, i);
        }
    }
    
    {
        Timer t("list insert(mid)");
        list<int> lst(SIZE, 0);
        auto it = lst.begin();
        advance(it, SIZE/2);
        for (int i = 0; i < TESTS; i++) {
            lst.insert(it, i);
        }
    }
    
    // ----- 4. 随机访问性能 -----
    cout << "\n--- 随机访问性能 ---" << endl;
    
    vector<int> vec(SIZE);
    list<int> lst(SIZE);
    
    random_device rd;
    mt19937 gen(rd());
    uniform_int_distribution<> dis(0, SIZE-1);
    
    {
        Timer t("vector random access");
        volatile int sum = 0;
        for (int i = 0; i < TESTS; i++) {
            sum += vec[dis(gen)];
        }
    }
    
    {
        Timer t("list random access");
        volatile int sum = 0;
        for (int i = 0; i < TESTS; i++) {
            auto it = lst.begin();
            advance(it, dis(gen));
            sum += *it;
        }
    }
    
    // ----- 5. 遍历性能 -----
    cout << "\n--- 遍历性能 ---" << endl;
    
    {
        Timer t("vector iteration");
        volatile int sum = 0;
        for (int x : vec) {
            sum += x;
        }
    }
    
    {
        Timer t("list iteration");
        volatile int sum = 0;
        for (int x : lst) {
            sum += x;
        }
    }
    
    // ----- 6. 排序性能 -----
    cout << "\n--- 排序性能 ---" << endl;
    
    vector<int> vec2(SIZE);
    for (int i = 0; i < SIZE; i++) {
        vec2[i] = rand();
    }
    
    list<int> lst2(vec2.begin(), vec2.end());
    
    {
        Timer t("vector sort");
        sort(vec2.begin(), vec2.end());
    }
    
    {
        Timer t("list sort");
        lst2.sort();
    }
    
    return 0;
}
```

## 11. 选择建议

```cpp
#include <iostream>
#include <vector>
#include <list>
#include <string>
using namespace std;

// 决策树：根据使用场景选择容器
class ContainerSelector {
public:
    static void recommend(const string& scenario) {
        cout << "\n使用场景: " << scenario << endl;
        cout << "推荐容器: ";
        
        if (scenario.find("随机访问") != string::npos ||
            scenario.find("排序") != string::npos ||
            scenario.find("末尾操作") != string::npos) {
            cout << "vector ✅" << endl;
            cout << "原因: 随机访问O(1)，排序高效，尾部插入快" << endl;
        }
        else if (scenario.find("中间插入") != string::npos ||
                 scenario.find("中间删除") != string::npos ||
                 scenario.find("频繁修改") != string::npos) {
            cout << "list ✅" << endl;
            cout << "原因: 中间插入删除O(1)，迭代器不会失效" << endl;
        }
        else {
            cout << "vector (默认选择)" << endl;
            cout << "原因: 大多数情况下vector性能更好" << endl;
        }
    }
};

int main() {
    cout << "\n========== 11. 选择建议 ==========" << endl;
    
    // 场景1：需要频繁随机访问
    ContainerSelector::recommend("需要频繁随机访问大量数据");
    
    // 场景2：需要在中间频繁插入删除
    ContainerSelector::recommend("需要在中间频繁插入和删除元素");
    
    // 场景3：只需要在末尾操作
    ContainerSelector::recommend("主要在末尾添加删除元素，需要排序");
    
    // 场景4：不确定使用场景
    ContainerSelector::recommend("不确定使用什么容器");
    
    // ----- 总结表格 -----
    cout << "\n--- 容器特性对比表 ---" << endl;
    cout << "操作            | vector | list" << endl;
    cout << "----------------|--------|------" << endl;
    cout << "尾部插入        | O(1)*  | O(1)" << endl;
    cout << "头部插入        | O(n)   | O(1)" << endl;
    cout << "中间插入        | O(n)   | O(1)" << endl;
    cout << "随机访问        | O(1)   | O(n)" << endl;
    cout << "顺序遍历        | O(n)   | O(n)" << endl;
    cout << "排序            | O(nlogn)| O(nlogn)" << endl;
    cout << "内存占用        | 连续   | 分散" << endl;
    cout << "迭代器失效      | 会失效 | 不会失效" << endl;
    
    cout << "\n* vector尾部插入均摊O(1)，需要时可能重新分配" << endl;
    
    return 0;
}
```

这个整理保持了原有的节奏感，每个章节都有清晰的标题，代码示例完整且有注释，同时覆盖了你之前提到的所有知识点，包括 emplace 系列操作和 advance 等迭代器操作。
