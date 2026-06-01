import { useEffect, useState } from "react";
import { getFights } from "../../services/domainRequest/fightRequest";
import { getFighters } from "../../services/domainRequest/fightersRequest";
import { Box, Button, Divider, Paper } from '@mui/material';


export default function FightHistory({ onBack }) {
  const [fights, setFights] = useState([]);
  const [fightersMap, setFightersMap] = useState({});

  useEffect(() => {
    async function load() {
      const [fightsData, fightersData] = await Promise.all([
        getFights(),
        getFighters()
      ]);

      if (!fightsData.error && !fightersData.error) {
        setFights(fightsData);

        const map = fightersData.reduce((acc, f) => {
          acc[f.id] = f.name;
          return acc;
        }, {});

        setFightersMap(map);
      }
    }

    load();
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Box
        sx={{
          width: "70%",
          mx: "auto",
          display: "flex",
          justifyContent: "space-between",
          mb: 2
        }}
      >
        <Box>Fight History</Box>
        <Button variant="outlined" size="small" onClick={onBack}>
          Back
        </Button>
      </Box>
      {fights.length === 0 && (
        <Box sx={{ width: "70%", mx: "auto", textAlign: "center", mt: 4 }}>
          No fights yet
        </Box>
      )}
      {fights.map((fight) => {
        const fighter1Name = fightersMap[fight.fighter1] || fight.fighter1;
        const fighter2Name = fightersMap[fight.fighter2] || fight.fighter2;
        const winnerName = fightersMap[fight.winner];

        return (
          <Paper
            key={fight.id}
            elevation={2}
            sx={{
              width: "70%",
              mx: "auto",
              mt: 2,
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Box>
              <Box>
                {fighter1Name} vs {fighter2Name}
              </Box>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ textAlign: "right" }}>
              <Box>
                {fight.winner
                  ? `Winner: ${winnerName}`
                  : "Draw"}
              </Box>
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
}