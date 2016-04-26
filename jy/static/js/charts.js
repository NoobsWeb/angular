var barCharts = function() {
    this.option = {
        xAxis: {
            type: 'category',
            axisLabel: {
                interval: 0
            },
            data: []
        },
        yAxis: {},
        series: [{
            type: 'bar',
            data: [],
            itemStyle: {
                normal: {
                    color: function(params) {
                        // build a color map as your need.
                        var colorList = ["#99ccff", "#99cccc", "#ffcc66", "#ff9999", "#99cc99", "#cc99cc"];
                        return colorList[params.dataIndex]
                    }
                }
            }
        }]
    }
    return this
}

var lineCharts = function(){
    this.option = {
      tooltip: {
        trigger: 'axis'
      },
      calculable: true,
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: []
      }],
      yAxis: [{
        type: 'value'
      }],
      series: [{
        name: '成交',
        type: 'line',
        smooth: true,
        itemStyle: {
          normal: {
            areaStyle: {
              type: 'default'
            },
            color: '#56a6e9'
          },
        },
        data: []
      }]
    };
}