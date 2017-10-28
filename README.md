# GorillaSale
A simple eth tokensale based on Open Zeppelin


# How to

Install truffle if you don't have it already
Install testrpc if you don't have it already

type


```
> testrpc -l 9879870
```

which starts the test blockchain with gas limit of 9879870 per block (choose your gas limit, this works for me)

from GorillaSale dir type

```
> truffle migrate --reset
```


This will compile all and launch contracts on the testrpc blockchain.


