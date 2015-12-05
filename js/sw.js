$(document).ready(function() {
	 
	 initOld();initNew();
	 
	 //old trilogy 
		function initOld() {
        //Constants for the SVG
        var width = 1300,
            height = 800;

        //Set up the force layout
        var force = d3.layout.force()
            .charge(-400)
            .linkDistance(230)
            .size([width, height]);

        //Append a SVG to the body of the html page. Assign this SVG as an object to svg
        var svg = d3.select("#old_trilogy_net").append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "graph-svg-component");

        //Read the data from the mis element 
        d3.json("star_graph_old_trilogy_mod.json", function(error, graph) {
          if (error) throw error;

        //Creates the graph data structure out of the json data
        force.nodes(graph.nodes)
            .links(graph.links)
            .start();

        //Create all the line svgs but without locations yet
        var link = svg.selectAll("#old_trilogy_net .link")
            .data(graph.links)
            .enter().append("line")
            .attr("class", "link")
            .style("stroke-width", function (d) {
            return d.weight / 2;
        });


        //Toggle stores whether the highlighting is on
        var toggle = 0;
        //Create an array logging what is connected to what
        var linkedByIndex = {};
        for (i = 0; i < graph.nodes.length; i++) {
            linkedByIndex[i + "," + i] = 1;
        };
        graph.links.forEach(function (d) {
            linkedByIndex[d.source.index + "," + d.target.index] = 1;
        });
        //This function looks up whether a pair are neighbours
        function neighboring(a, b) {
            return linkedByIndex[a.index + "," + b.index];
        }
        function connectedNodes() {
            if (toggle == 0) {
                //Reduce the opacity of all but the neighbouring nodes
                d = d3.select(this).node().__data__;
                node.style("opacity", function (o) {
                    return neighboring(d, o) | neighboring(o, d) ? 1 : 0.1;
                });
                link.style("opacity", function (o) {
                    return d.index==o.source.index | d.index==o.target.index ? 1 : 0.1;
                });
                //Reduce the op
                toggle = 1;
            } else {
                //Put them back to opacity=1
                node.style("opacity", 1);
                link.style("opacity", 1);
                toggle = 0;
            }
        }

        //Do the same with the circles for the nodes - no 
        //Changed
        var node = svg.selectAll("#old_trilogy_net .node")
            .data(graph.nodes)
            .enter().append("g")
            .attr("class", "node")
            .call(force.drag)
             .on("mouseover", mouseover)
             .on("mouseout", mouseout)
             .on('dblclick', connectedNodes); //Added code 

        var padding = 1, // separation between circles
            radius=8;
        function collide(alpha) {
          var quadtree = d3.geom.quadtree(graph.nodes);
          return function(d) {
            var rb = 2*radius + padding,
                nx1 = d.x - rb,
                nx2 = d.x + rb,
                ny1 = d.y - rb,
                ny2 = d.y + rb;
            quadtree.visit(function(quad, x1, y1, x2, y2) {
              if (quad.point && (quad.point !== d)) {
                var x = d.x - quad.point.x,
                    y = d.y - quad.point.y,
                    l = Math.sqrt(x * x + y * y);
                  if (l < rb) {
                  l = (l - rb) / l * alpha;
                  d.x -= x *= l;
                  d.y -= y *= l;
                  quad.point.x += x;
                  quad.point.y += y;
                }
              }
              return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            });
          };
        }


        node.append("circle")
              .attr("class", "node")
              .attr("r", function(d) { return Math.log10(d.degree + 3) * 9})
              .style("fill", "#F00")
              .call(force.drag);

        node.append("g");

        node.append("text")
              .attr("dx", 10)
              .attr("dy", ".35em")
              .style("fill", "white")
              .style("stroke", "darkgray")
              .style("stroke-width", "0.75px")
              .text(function(d) { return d.id });


        function mouseover() {
            d3.select(this).select("circle").transition()
                .duration(30)
                .attr("r", 30);
            d3.select(this).select("text").transition()
                .duration(30)
                .text(function(d) { return  d.degree + ' conversations' });
        }

        function mouseout() {
            d3.select(this).select("circle").transition()
                .duration(30)
                .attr("r", function(d) { return Math.log10(d.degree + 3) * 9} );
            d3.select(this).select("text").transition()
                .duration(30)
                .text(function(d) { return d.id });
        }



        //Now we are giving the SVGs co-ordinates - the force layout is generating the co-ordinates which this code is using to update the attributes of the SVG elements
        force.on("tick", function () {
            link.attr("x1", function (d) {
                return d.source.x;
            })
                .attr("y1", function (d) {
                return d.source.y;
            })
                .attr("x2", function (d) {
                return d.target.x;
            })
                .attr("y2", function (d) {
                return d.target.y;
            });



            d3.selectAll("#old_trilogy_net circle").attr("cx", function (d) {
                return d.x;
            })
                .attr("cy", function (d) {
                return d.y;
            });

            d3.selectAll("#old_trilogy_net text").attr("x", function (d) {
                return d.x;
            })
                .attr("y", function (d) {
                return d.y;
            });

            node.each(collide(0.25)); 

        });});
		
		}
	 
		//new trilogy 
		function initNew() {
        //Constants for the SVG
        var width = 1300,
            height = 900;

        //Set up the force layout
        var force = d3.layout.force()
            .charge(-400)
            .linkDistance(230)
            .size([width, height]);

        //Append a SVG to the body of the html page. Assign this SVG as an object to svg
        var svg = d3.select("#new_trilogy_net").append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "graph-svg-component");

        //Read the data from the mis element 
        d3.json("star_graph_new_trilogy_mod.json", function(error, graph) {
          if (error) throw error;

        //Creates the graph data structure out of the json data
        force.nodes(graph.nodes)
            .links(graph.links)
            .start();

        //Create all the line svgs but without locations yet
        var link = svg.selectAll("#new_trilogy_net .link")
            .data(graph.links)
            .enter().append("line")
            .attr("class", "link")
            .style("stroke-width", function (d) {
            return d.weight / 2;
        });


        //Toggle stores whether the highlighting is on
        var toggle = 0;
        //Create an array logging what is connected to what
        var linkedByIndex = {};
        for (i = 0; i < graph.nodes.length; i++) {
            linkedByIndex[i + "," + i] = 1;
        };
        graph.links.forEach(function (d) {
            linkedByIndex[d.source.index + "," + d.target.index] = 1;
        });
        //This function looks up whether a pair are neighbours
        function neighboring(a, b) {
            return linkedByIndex[a.index + "," + b.index];
        }
        function connectedNodes() {
            if (toggle == 0) {
                //Reduce the opacity of all but the neighbouring nodes
                d = d3.select(this).node().__data__;
                node.style("opacity", function (o) {
                    return neighboring(d, o) | neighboring(o, d) ? 1 : 0.1;
                });
                link.style("opacity", function (o) {
                    return d.index==o.source.index | d.index==o.target.index ? 1 : 0.1;
                });
                //Reduce the op
                toggle = 1;
            } else {
                //Put them back to opacity=1
                node.style("opacity", 1);
                link.style("opacity", 1);
                toggle = 0;
            }
        }

        //Do the same with the circles for the nodes - no 
        //Changed
        var node = svg.selectAll("#new_trilogy_net .node")
            .data(graph.nodes)
            .enter().append("g")
            .attr("class", "node")
            .call(force.drag)
             .on("mouseover", mouseover)
             .on("mouseout", mouseout)
             .on('dblclick', connectedNodes); //Added code 

        var padding = 1, // separation between circles
            radius=8;
        function collide(alpha) {
          var quadtree = d3.geom.quadtree(graph.nodes);
          return function(d) {
            var rb = 2*radius + padding,
                nx1 = d.x - rb,
                nx2 = d.x + rb,
                ny1 = d.y - rb,
                ny2 = d.y + rb;
            quadtree.visit(function(quad, x1, y1, x2, y2) {
              if (quad.point && (quad.point !== d)) {
                var x = d.x - quad.point.x,
                    y = d.y - quad.point.y,
                    l = Math.sqrt(x * x + y * y);
                  if (l < rb) {
                  l = (l - rb) / l * alpha;
                  d.x -= x *= l;
                  d.y -= y *= l;
                  quad.point.x += x;
                  quad.point.y += y;
                }
              }
              return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            });
          };
        }


        node.append("circle")
              .attr("class", "node")
              .attr("r", function(d) { return Math.log10(d.degree + 3) * 9})
              .style("fill", "#F00")
              .call(force.drag);

        node.append("g");

        node.append("text")
              .attr("dx", 10)
              .attr("dy", ".35em")
              .style("fill", "white")
              .style("stroke", "darkgray")
              .style("stroke-width", "0.75px")
              .text(function(d) { return d.id });


        function mouseover() {
            d3.select(this).select("circle").transition()
                .duration(30)
                .attr("r", 30);
            d3.select(this).select("text").transition()
                .duration(30)
                .text(function(d) { return  d.degree + ' conversations' });
        }

        function mouseout() {
            d3.select(this).select("circle").transition()
                .duration(30)
                .attr("r", function(d) { return Math.log10(d.degree + 3) * 9} );
            d3.select(this).select("text").transition()
                .duration(30)
                .text(function(d) { return d.id });
        }



        //Now we are giving the SVGs co-ordinates - the force layout is generating the co-ordinates which this code is using to update the attributes of the SVG elements
        force.on("tick", function () {
            link.attr("x1", function (d) {
                return d.source.x;
            })
                .attr("y1", function (d) {
                return d.source.y;
            })
                .attr("x2", function (d) {
                return d.target.x;
            })
                .attr("y2", function (d) {
                return d.target.y;
            });



            d3.selectAll("#new_trilogy_net circle").attr("cx", function (d) {
                return d.x;
            })
                .attr("cy", function (d) {
                return d.y;
            });

            d3.selectAll("#new_trilogy_net text").attr("x", function (d) {
                return d.x;
            })
                .attr("y", function (d) {
                return d.y;
            });

            node.each(collide(0.25)); 

        });});
		
		}
		});