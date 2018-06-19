kosmos
======

# Cellular Automata

> A cellular automaton consists of a regular grid of cells, each in one of a finite number of states, such as on and off. One way to simulate a two-dimensional cellular automaton is with an infinite sheet of graph paper along with a set of rules for the cells to follow. Each square is called a "cell" and each cell has two possible states, black and white. The neighborhood of a cell is the nearby, usually adjacent, cells. <a href="http://en.wikipedia.org/wiki/Cellular_automaton">http://en.wikipedia.org/wiki/Cellular_automaton</a>

## 1st experiment

As a starting place of cellular automaton studies, I reproduced cellular automata using wolfram's rules. The result is:

<img src="https://raw.github.com/after12am/Automata/master/www/img/screenshot.jpg" />

## 2nd experiment

As the second experiment of cellular automata, I revive John Conway's Game of Life. The result is:

<img src="https://raw.github.com/after12am/Automata/master/www/img/screenshot_of_life.png" width="100%" />

If you want to observe artificial life simulation of John Conway's Game of Life. Run the following command in your new terminal, and open `http://localhost:8000/smallworld.html`.

```
cd /path/to/www
python -m SimpleHTTPServer
```

> Chaos theory studies the behavior of dynamical systems that are highly sensitive to initial conditions, an effect which is popularly referred to as the butterfly effect. Small differences in initial conditions (such as those due to rounding errors in numerical computation) yield widely diverging outcomes for chaotic systems, rendering long-term prediction impossible in general. This happens even though these systems are deterministic, meaning that their future behavior is fully determined by their initial conditions, with no random elements involved. <a href="http://en.wikipedia.org/wiki/Chaos_theory">http://en.wikipedia.org/wiki/Chaos_theory</a>

## 3rd experiment

In the beginning, I produced chaos behavior using iterated function, and made a image which showing how the initial value affects their behavior. The image is:

<img src="https://raw.github.com/after12am/Automata/master/www/img/chaos/chaos_screenshot.png"/>

## What's Next

* I suppose to combine cellular automata and genetic algorithm, using fractal dimension as the evaluating complexity of image.
* finding a chaotic behavior using fractal dimension as evaluation of genetic algorithm.
