var svg02_02 = d3.select("#vis-2"),
    margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    },
    width = +svg02_02.node().getBoundingClientRect().width - margin.left - margin.right,
    height = +svg02_02.attr("height") - margin.top - margin.bottom,
    g2 = svg02_02.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x0 = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.1);

var x1 = d3.scaleBand()
    .padding(0.05);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888"]);

d3.csv("/wp-habitat/data/02_lakasminoseg_energiaszegenyseg/02_02_vezetek_csatorna.csv", function (d, i, columns) {
    for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
    return d;
}, function (error, data) {
    if (error) throw error;

    var keys = data.columns.slice(1);

    x0.domain(data.map(function (d) {
        return d.Régió;
    }));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(data, function (d) {
        return d3.max(keys, function (key) {
            return d[key];
        });
    })]).nice();

    g2.append("g")
        .selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function (d) {
            return "translate(" + x0(d.Régió) + ",0)";
        })
        .selectAll("rect")
        .data(function (d) {
            return keys.map(function (key) {
                return {
                    key: key,
                    value: d[key]
                };
            });
        })
        .enter().append("rect")
        .attr("x", function (d) {
            return x1(d.key);
        })
        .attr("y", function (d) {
            return y(d.value);
        })
        .attr("width", x1.bandwidth())
        .attr("height", function (d) {
            return height - y(d.value);
        })
        .attr("fill", function (d) {
            return z(d.key);
        });

    g2.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x0));

    g2.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(null, "s"))
        .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("%");

    var legend = g2.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice().reverse())
        .enter().append("g")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
        });

    legend.append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function (d) {
            return d;
        });
});
