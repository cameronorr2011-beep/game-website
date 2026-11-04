"""The explorer must show the actual network used by the simulation."""
import unittest

from api.sleep import build, simulate


class ConnectomeTest(unittest.TestCase):
    def test_simulation_exports_instantiated_synapses(self):
        result = simulate(seconds=0.5, seed=7)
        net = build(seed=7)
        expected = [(int(src), int(dst), edge['family'])
                    for edge in net['edges']
                    for src, dst in zip(edge['src'], edge['dst'])]
        self.assertEqual([tuple(edge) for edge in result['synapses']], expected)
        self.assertEqual(len(expected), result['meta']['synapses'])
        self.assertTrue(all(0 <= src < net['n'] and 0 <= dst < net['n']
                            for src, dst, _ in expected))

    def test_seed_controls_network(self):
        first = simulate(seconds=0.5, seed=7)
        second = simulate(seconds=0.5, seed=8)
        self.assertNotEqual(first['synapses'], second['synapses'])
        self.assertEqual(len(first['synapses']), len(second['synapses']))


if __name__ == '__main__':
    unittest.main()
