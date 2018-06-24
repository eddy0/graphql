# graphql
graphql + react




#### naming the item and useage fragment
```
// GraphQL
{
  google: company(id: "1") {
    ...list
  }
  apple: company(id: "2") {
    name
    id
  }
}

fragment list on company {
  name,
  id
}
```

#### GraphQNonNull
similar to required, if not provided, then throw error
