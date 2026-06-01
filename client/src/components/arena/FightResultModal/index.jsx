import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button
} from "@mui/material";

export default function FightResultModal({
  winner,
  open,
  onRestart,
  onBackToMenu
}) {
  return (
    <Dialog open={open}>
      <DialogTitle>
        {winner
          ? `${winner.name} wins!`
          : "Draw"}
      </DialogTitle>

      <DialogActions>
        <Button
          variant="contained"
          onClick={onRestart}
        >
          Fight Again
        </Button>

        <Button
          variant="outlined"
          onClick={onBackToMenu}
        >
          Back to Menu
        </Button>
      </DialogActions>
    </Dialog>
  );
}