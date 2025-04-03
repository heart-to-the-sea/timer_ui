export default {
  xAxis: {
    type: 'category',
    data: [
      '09:55',
      '09:57',
      '09:59',
      '10:00',
      '10:02',
      '10:04',
      '10:06',
      '10:08',
      '10:10',
      '10:12',
      '10:14',
      '10:16',
      '10:18',
      '10:20',
      '10:22',
      '10:24',
      '10:26',
      '10:28',
      '10:30',
      '10:32',
      '10:34',
      '10:36',
      '10:38',
      '10:40',
      '10:42',
      '10:44',
      '10:46',
      '10:48',
      '10:50',
      '10:52',
      '10:54',
      '10:56',
      '10:58',
      '11:00',
      '11:02',
      '11:04',
      '11:06',
      '11:08',
      '11:10'
    ],
    axisLabel: {
      color: '#fff'
    },
    axisLine: {
      lineStyle: {
        color: '#fff'
      }
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    }
  },
  legend: {
    data: ['预测有功功率', '实际有功功率'],
    right: '3%',
    top: '1%',
    textStyle: {
      fontSize: 14,
      color: '#ffffff'
    },
    itemWidth: 20,
    itemHeight: 10,
    itemGap: 5
  },
  yAxis: {
    type: 'value',
    name: '功率(mW)',
    min: 0.9,
    max: 2,
    interval: 0.1,
    axisLabel: {
      color: '#fff'
    },
    axisLine: {
      lineStyle: {
        color: '#fff'
      }
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    }
  },
  tooltip: {
    trigger: 'axis',
    formatter: function(params) {
      let result = '时间：' + params[0].axisValue + '<br />';
      params.forEach(param => {
        const color = param.color;
        result += `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${color}"></span>${param.seriesName}: ${param.value} mW<br />`;
      });
      return result;
    }
  },
  series: [
    {
      name: '预测有功功率',
      color: '#cc7963',
      data: [
        1.32, // 09:55 - 波动
        1.31, // 09:57 - 波动
        1.4, // 09:59 - 波动
        1.46, // 10:00 - 连接点
        1.55, // 10:02 - 快速下降
        1.6, // 10:04 - 快速下降
        1.71, // 10:06 - 快速下降
        1.81, // 10:08 - 快速下降
        1.83, // 10:10 - 快速下降
        1.85, // 10:12 - 快速下降
        1.86, // 10:14 - 快速下降
        1.87, // 10:16 - 快速下降
        1.9, // 10:18 - 开始稳定
        1.93, // 10:20 - 小幅波动
        1.91, // 10:22 - 小幅波动
        1.9, // 10:24 - 小幅波动
        1.89, // 10:26 - 小幅波动
        1.89, // 10:28 - 小幅波动
        1.9, // 10:30 - 小幅波动
        1.9, // 10:32 - 小幅波动
        1.89, // 10:34 - 小幅波动
        1.86, // 10:36 - 小幅波动
        1.84, // 10:38 - 小幅波动
        1.82, // 10:40 - 小幅波动
        1.81, // 10:42 - 小幅波动
        1.8, // 10:44 - 小幅波动
        1.75, // 10:46 - 小幅波动
        1.7, // 10:48 - 小幅波动
        1.6, // 10:50 - 小幅波动
        1.57, // 10:52 - 小幅波动
        1.53, // 10:54 - 小幅波动
        1.5, // 10:56 - 小幅波动
        1.5, // 10:58 - 小幅波动
        1.55, // 11:00 - 小幅波动
        1.51, // 11:02 - 快速提升
        1.5, // 11:04 - 快速提升
        1.48, // 11:06 - 波动
        1.5, // 11:08 - 波动
        1.48 // 11:10 - 波动
      ],
      type: 'line',
      smooth: true,
      markLine: {
        silent: true,
        symbol: ['none', 'none'],
        data: [
          {
            xAxis: '10:00',
            lineStyle: {
              color: '#91cc75',
              type: 'dashed',
              width: 2
            },
            label: {
              show: true,
              position: 'end',
              formatter: '开始响应调控指令',
              color: '#000',
              fontSize: 12,
              backgroundColor: '#91cc75',
              padding: [4, 8],
              borderRadius: 4,
              distance: [0, 10]
            }
          },
          {
            xAxis: '11:00',
            lineStyle: {
              color: '#ff4d4f',
              type: 'dashed',
              width: 2
            },
            label: {
              show: true,
              position: 'end',
              formatter: '结束执行',
              color: '#000',
              fontSize: 12,
              backgroundColor: '#ff4d4f',
              padding: [4, 8],
              borderRadius: 4,
              distance: [0, 10]
            }
          },

          {
            yAxis: 1.5,
            lineStyle: {
              color: '#ff4d4f',
              type: 'dashed',
              width: 1
            }
          },
          {
            yAxis: 1.0,
            lineStyle: {
              color: '#91cc22',
              type: 'dashed',
              width: 1
            }
          }
        ]
      }
    },

    {
      name: '实际有功功率',
      color: '#00c4c4',
      data: [
        1.32, // 09:55 - 波动
        1.31, // 09:57 - 波动
        1.4, // 09:59 - 波动
        1.46, // 10:00 - 连接点
        1.05,
        1.1,
        1.21,
        1.31,
        1.33,
        1.35,
        1.36,
        1.37,
        1.4,
        1.43,
        1.41,
        1.4,
        1.39,
        1.39,
        1.4,
        1.4,
        1.39,
        1.36,
        1.34,
        1.32,
        1.31,
        1.3,
        1.25,
        1.2,
        1.1,
        1.07,
        1.03,
        1.0,
        0.99, // 10:58 - 小幅波动
        1.05, // 11:00 - 小幅波动
        1.51, // 11:02 - 快速提升
        1.5, // 11:04 - 快速提升
        1.48, // 11:06 - 波动
        1.5, // 11:08 - 波动
        1.48 // 11:10 - 波动
      ],
      type: 'line',
      smooth: true
    }
  ]
};
