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