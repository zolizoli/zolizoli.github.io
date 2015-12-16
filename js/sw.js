$(document).ready(function() {
	 
	 initOld();initNew();initMood();

    //mood
    function initMood() {
        //Width and height
        var w = 2000;
        var h = 800;
        var barPadding = 1;
        var dataset = [];
        var datasentim = [];
        var datascenes = [];
        var movieStart = [0, 190, 346, 588, 1088, 1368, 1506];


        var svg = d3.select("#mood")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        d3.tsv("data/scenes.tsv", function(error, datascenes) {
            datascenes.forEach(function(d, i) {
                datascenes[i] = +d.film;
            });

            d3.tsv("data/scene_sentiment.tsv", function(error, datatsv) {
                datatsv.forEach(function(d, i) {
                    datasentim[i] = +d.sentiment;
                });


                d3.csv("data/char2.csv", function(error, data) {

                    data.forEach(function(d, i) {

                        if(d.sum == "#"){
                            draw(2);
                        }//if
                        else
                        {
                            dataset[i] = Object.keys(d).map(function (key) {return d[key]});

                        }

                    });//forEach
                });//csv

                var sqWidth = 6;
                var baseOpac = 0.5;
                var gap = 3;
                var scaleHeight = 2.5;
                var movieGap = 100;
                var prevMovie = 0;
                var sceneNum = 0;
                var difPos = 0;
                var linePadding = 5;

                function draw(who){

                    svg.selectAll("#mood line")
                        .data(movieStart)
                        .enter()
                        .append("line")
                        .attr("x1", 0)
                        .attr("y1", function(d, i) {
                            return i*movieGap+linePadding;
                        })
                        .attr("x2", function(d, i) {
                            return (movieStart[i]-movieStart[i-1])*gap;
                        })
                        .attr("y2", function(d, i) {
                            return i*movieGap+linePadding;
                        })
                        .attr("stroke-width", 1)
                        .attr("stroke", "#333")
                    ;


                    svg.selectAll("#mood line")
                        .data(dataset[who])
                        .enter()
                        .append("line")
                        .filter(function(d, i){ return i < 1506;  })

                        .attr("x1", function(d, i) {
                            difPos = movieStart[datascenes[i]-1]*gap;
                            return i*gap-difPos;
                        })
                        .attr("y1", function(d, i) {
                            return movieGap*datascenes[i]; })
                        .attr("x2", function(d, i) {
                            difPos = movieStart[datascenes[i]-1]*gap;
                            return i*gap-difPos; })
                        .attr("y2", function(d, i) {

                            return  Math.floor(-d*scaleHeight+movieGap*datascenes[i]); })
                        .attr("stroke-width", 1)
                        .attr("stroke", function(d, i) {
                            return (d!=0) ? "white" : "none";   } )
                        .attr("stroke-linecap", "square")
                        .attr("class", "ldata")
                    ;


                    svg.selectAll("#mood rects")
                        .data(dataset[who])
                        .enter()
                        .append("rect")
                        .filter(function(d, i){ return (i < 1506)})
                        .attr("x", function(d, i) {
                            difPos = movieStart[datascenes[i]-1]*gap;
                            return i*gap-sqWidth/2-difPos; })
                        .attr("y", function(d, i) {
                            return movieGap*datascenes[i]+linePadding*2; })
                        .attr("width", sqWidth)
                        .attr("height", sqWidth)
                        .attr("fill", function(d, i) {
                            return (datasentim[i]==0) || (d==0) ? "none" : (datasentim[i]<0) ? "SlateGray" : "DeepPink";   } )

                        .style("opacity", function(d, i) {
                            return (datasentim[i]<0) ? (datasentim[i]*-1+baseOpac) : (datasentim[i]>0) ? (datasentim[i]+baseOpac) : 0;
                        })


                    ;


                    svg.append("text")
                        .text(dataset[who][1507])
                        .attr("text-anchor", "middle")
                        .attr("x", 40)
                        .attr("y", 50)
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "14px")
                        .attr("fill", "white")
                        .attr("class", "upper")
                    ;


                }//draw


                d3.select("#mood")
                    .on("click", function() {

                        var newChar = Math.floor(Math.random() * 20-1);


                        svg.selectAll(".ldata")
                            .data(dataset[newChar])
                            .transition()
                            .duration(500)
                            .delay(function(d, i){ return i*500*2/1506; })
                            .filter(function(d, i){ return i < 1506; })
                            .attr("y2", function(d, i) {return  Math.floor(-d*scaleHeight+movieGap*datascenes[i]); })
                            .attr("stroke", function(d, i) {
                                return (d!=0) ? "white" : "none";   } )

                        ;

                        svg.selectAll("#mood rect")
                            .data(dataset[newChar])
                            .transition()
                            .duration(500)
                            .delay(function(d, i){ return i*500*2/1506; })
                            .filter(function(d, i){ return (i < 1506); })
                            .attr("fill", function(d, i) {
                                return (datasentim[i]==0) || (d==0) ? "none" : (datasentim[i]<0) ? "SlateGray" : "DeepPink";   } )
                            .style("opacity", function(d, i) {
                                return (datasentim[i]<0) ? (datasentim[i]*-1+baseOpac) : (datasentim[i]>0) ? (datasentim[i]+baseOpac) : 0;
                            })
                        ;

                        svg.selectAll("#mood text")
                            .data(dataset[newChar])
                            .transition()
                            .duration(500)
                            .text(dataset[newChar][1507])

                        ;

                    });



            });	//senti tsv
        });	//scene tsv
    }
	 
	 //old trilogy 
		function initOld() {
        //Constants for the SVG
        var width = 1500,
            height = 800;

        //Set up the force layout
        var force = d3.layout.force()
            .charge(-250)
            .linkDistance(550)
            .size([width, height]);

        //Append a SVG to the body of the html page. Assign this SVG as an object to svg
        var svg = d3.select("body").append("svg")
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
        var link = svg.selectAll(".link")
            .data(graph.links)
            .enter().append("line")
            .attr("class", "link")
            .attr("stroke", function (d) {
                return "rgb("+  d.weight*10 +"," + (120+d.weight*10*10) + ","+  (120+d.weight*10*10) +")";
                //return "rgb("+ (100+d.weight*2*10)  +"," + (100+d.weight*6*10) + ","+ (100+d.weight * 10*10) +")";
               }) 
            .style("stroke-width", function (d) {
            return 0.2+d.weight / 6;     
                     })
              .style("opacity", "0.2")
           
            

            ;


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
                    return d.index==o.source.index | d.index==o.target.index ? 0.8 : 0.1;
                })

                ;
                //Reduce the op
                toggle = 1;
            } else {
                //Put them back to opacity=1
                node.style("opacity", 1);
                link.style("opacity", 0.2);
                toggle = 0;
            }
        }

        //Do the same with the circles for the nodes - no 
        //Changed
        var node = svg.selectAll(".node")
            .data(graph.nodes)
            .enter().append("g")
            .attr("class", "node")
            .call(force.drag)
             .on("mouseover", mouseover)
             .on("mouseout", mouseout)
             .on('click', connectedNodes); //Added code 

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
              .style("fill", function(d) {
                //console.log(d.degree);
                    //return "rgb("+ (20+d.degree*2)  +"," + (100+d.degree*6) + ","+ (100+d.degree * 10) +")";
                    return "rgb("+  d.degree +"," + (120+d.degree*10) + ","+  (120+d.degree*10) +")";

               })
              .style("opacity", "0.8")
              .call(force.drag);

        node.append("g");

        node.append("text")
              .attr("dx", function(d) { return Math.log10(d.degree + 3) * 9 + 2})
              .attr("dy", ".35em")
              .style("fill", "white")             
              .text(function(d) { return d.id })
              .attr("class", "name")
               //.attr("font-size", function(d) { return Math.log10(d.degree + 14) * 9 })

              ;


        function mouseover() {
            d3.select(this).select("circle").transition()
                .duration(30)
                .attr("r", 30);
            d3.select(this).select("text").transition()
                .duration(30)
                .text(function(d) { return  d.degree + '' })
                .style("fill", "black")
                 .attr("dx", function(d) { return Math.log10(d.degree + 3) * 9 -25})
                 .attr("text-anchor", "middle")

               


                ;
        }

        function mouseout() {
            d3.select(this).select("circle").transition()
                .duration(30)
                .attr("r", function(d) { return Math.log10(d.degree + 3) * 9})
            d3.select(this).select("text").transition()
                .duration(30)
                .text(function(d) { return d.id })
                .style("fill", "white")
                 .attr("dx", function(d) { return Math.log10(d.degree + 3) * 9 + 2})
                 .attr("text-anchor", "left")

                ;
        }



var heightScale = 0.5;
var topPadding= 100;
        //Now we are giving the SVGs co-ordinates - the force layout is generating the co-ordinates which this code is using to update the attributes of the SVG elements
        force.on("tick", function () {
            link.attr("x1", function (d) {
                return d.source.x;
            })
                .attr("y1", function (d) {
                return d.source.y*heightScale+topPadding;
            })
                .attr("x2", function (d) {
                return d.target.x;
            })
                .attr("y2", function (d) {
                return d.target.y*heightScale+topPadding;
            });



            d3.selectAll("circle").attr("cx", function (d) {
                return d.x;
            })
                .attr("cy", function (d) {
                return d.y*heightScale+topPadding;
            });

            d3.selectAll("text").attr("x", function (d) {
                return d.x;
            })
                .attr("y", function (d) {
                return d.y*heightScale+topPadding;
            });

            node.each(collide(0.25)); 

        });});

		}
	 
		//new trilogy 
		function initNew() {
          //Constants for the SVG
        var width = 1500,
            height = 800;

        //Set up the force layout
        var force = d3.layout.force()
            .charge(-250)
            .linkDistance(550)
            .size([width, height]);

        //Append a SVG to the body of the html page. Assign this SVG as an object to svg
        var svg = d3.select("body").append("svg")
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
        var link = svg.selectAll(".link")
            .data(graph.links)
            .enter().append("line")
            .attr("class", "link")
            .attr("stroke", function (d) {
                return "rgb("+  d.weight*10 +"," + (120+d.weight*10*10) + ","+  (120+d.weight*10*10) +")";
                //return "rgb("+ (100+d.weight*2*10)  +"," + (100+d.weight*6*10) + ","+ (100+d.weight * 10*10) +")";
               }) 
            .style("stroke-width", function (d) {
            return 0.2+d.weight / 6;     
                     })
              .style("opacity", "0.2")
           
            

            ;


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
                    return d.index==o.source.index | d.index==o.target.index ? 0.8 : 0.1;
                })

                ;
                //Reduce the op
                toggle = 1;
            } else {
                //Put them back to opacity=1
                node.style("opacity", 1);
                link.style("opacity", 0.2);
                toggle = 0;
            }
        }

        //Do the same with the circles for the nodes - no 
        //Changed
        var node = svg.selectAll(".node")
            .data(graph.nodes)
            .enter().append("g")
            .attr("class", "node")
            .call(force.drag)
             .on("mouseover", mouseover)
             .on("mouseout", mouseout)
             .on('click', connectedNodes); //Added code 

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
              .style("fill", function(d) {
                //console.log(d.degree);
                    //return "rgb("+ (20+d.degree*2)  +"," + (100+d.degree*6) + ","+ (100+d.degree * 10) +")";
                    return "rgb("+  d.degree +"," + (120+d.degree*10) + ","+  (120+d.degree*10) +")";

               })
              .style("opacity", "0.8")
              .call(force.drag);

        node.append("g");

        node.append("text")
              .attr("dx", function(d) { return Math.log10(d.degree + 3) * 9 + 2})
              .attr("dy", ".35em")
              .style("fill", "white")             
              .text(function(d) { return d.id })
              .attr("class", "name")
               //.attr("font-size", function(d) { return Math.log10(d.degree + 14) * 9 })

              ;


        function mouseover() {
            d3.select(this).select("circle").transition()
                .duration(30)
                .attr("r", 30);
            d3.select(this).select("text").transition()
                .duration(30)
                .text(function(d) { return  d.degree + '' })
                .style("fill", "black")
                 .attr("dx", function(d) { return Math.log10(d.degree + 3) * 9 -25})
                 .attr("text-anchor", "middle")

               


                ;
        }

        function mouseout() {
            d3.select(this).select("circle").transition()
                .duration(30)
                .attr("r", function(d) { return Math.log10(d.degree + 3) * 9})
            d3.select(this).select("text").transition()
                .duration(30)
                .text(function(d) { return d.id })
                .style("fill", "white")
                 .attr("dx", function(d) { return Math.log10(d.degree + 3) * 9 + 2})
                 .attr("text-anchor", "left")

                ;
        }



var heightScale = 0.5;
var topPadding= 100;
        //Now we are giving the SVGs co-ordinates - the force layout is generating the co-ordinates which this code is using to update the attributes of the SVG elements
        force.on("tick", function () {
            link.attr("x1", function (d) {
                return d.source.x;
            })
                .attr("y1", function (d) {
                return d.source.y*heightScale+topPadding;
            })
                .attr("x2", function (d) {
                return d.target.x;
            })
                .attr("y2", function (d) {
                return d.target.y*heightScale+topPadding;
            });



            d3.selectAll("circle").attr("cx", function (d) {
                return d.x;
            })
                .attr("cy", function (d) {
                return d.y*heightScale+topPadding;
            });

            d3.selectAll("text").attr("x", function (d) {
                return d.x;
            })
                .attr("y", function (d) {
                return d.y*heightScale+topPadding;
            });

            node.each(collide(0.25)); 

        });});
		});