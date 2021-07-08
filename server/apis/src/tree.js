const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// 树
router.get("/tree", (req, res) => {
  const tree = [
    {
      nationName: "中国",
      provinces: [
        {
          provinceName: "河北",
        },
        {
          provinceName: "山西",
        },
        {
          provinceName: "内蒙古",
        },
        {
          provinceName: "辽宁",
        },
        {
          provinceName: "吉林",
        },
        {
          provinceName: "黑龙江",
        },
        {
          provinceName: "江苏",
        },
        {
          provinceName: "浙江",
        },
        {
          provinceName: "安徽",
        },
        {
          provinceName: "福建",
        },
        {
          provinceName: "江西",
        },
        {
          provinceName: "山东",
        },
        {
          provinceName: "河南",
        },
        {
          provinceName: "湖北",
        },
        {
          provinceName: "湖南",
        },
        {
          provinceName: "广东",
        },
        {
          provinceName: "广西",
        },
        {
          provinceName: "海南",
        },
        {
          provinceName: "四川",
        },
        {
          provinceName: "贵州",
        },
        {
          provinceName: "云南",
        },
        {
          provinceName: "陕西",
        },
        {
          provinceName: "甘肃",
        },
        {
          provinceName: "青海",
        },
        {
          provinceName: "西藏",
        },
        {
          provinceName: "宁夏",
        },
        {
          provinceName: "台湾",
        },
        {
          provinceName: "北京",
        },
        {
          provinceName: "天津",
        },
        {
          provinceName: "上海",
        },
        {
          provinceName: "重庆",
        },
        {
          provinceName: "香港",
        },
        {
          provinceName: "澳门",
        },
        {
          provinceName: "新疆",
        },
      ],
    },
  ];

  res.json({ status: "200", data: tree });
});
// 具体的数据
router.get(`/tree/map/province/:name/list`, (req, res) => {
  const { name } = req.params;
  const chinaDatas = [
    {
      name: "黑龙江",
      value: [100],
    },
    {
      name: "内蒙古",
      value: 300,
    },
    {
      name: "吉林",
      value: 300,
    },
    {
      name: "辽宁",
      value: 300,
    },
    {
      name: "河北",
      value: 300,
    },
    {
      name: "天津",
      value: 300,
    },
    {
      name: "山西",
      value: 300,
    },
    {
      name: "陕西",
      value: 300,
    },
    {
      name: "甘肃",
      value: 300,
    },
    {
      name: "宁夏",
      value: 300,
    },
    {
      name: "青海",
      value: 300,
    },
    {
      name: "新疆",
      value: 300,
    },
    {
      name: "西藏",
      value: 300,
    },
    {
      name: "四川",
      value: 300,
    },
    {
      name: "重庆",
      value: 300,
    },
    {
      name: "山东",
      value: 300,
    },
    {
      name: "河南",
      value: 300,
    },
    {
      name: "江苏",
      value: 300,
    },
    {
      name: "安徽",
      value: 300,
    },
    {
      name: "湖北",
      value: 300,
    },
    {
      name: "浙江",
      value: 300,
    },
    {
      name: "福建",
      value: 300,
    },
    {
      name: "江西",
      value: 300,
    },
    {
      name: "湖南",
      value: 300,
    },
    {
      name: "贵州",
      value: 300,
    },
    {
      name: "广西",
      value: 300,
    },
    {
      name: "海南",
      value: 300,
    },
    {
      name: "上海",
      value: 1300,
    },
  ];
  const redData = chinaDatas.filter((province) => {
    return province.name === name;
  });
  res.json({ status: "200", data: redData });
});

module.exports = router;
