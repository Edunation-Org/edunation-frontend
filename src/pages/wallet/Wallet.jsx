import { useContext, useEffect, useState } from "react";
import axiosInstance from "../../authentication/AxiosInstance";
import s from "./styles/Wallet.module.css";
import config from "../../configs/config";
import Navbar from "../../global/components/Navbar";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AuthContext from "../../authentication/AuthContext";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Wallet() {
  const { setUser } = useContext(AuthContext);

  const [amount, setAmount] = useState(null);

  const [walletDetails, setWalletDetails] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const handleTopUp = async () => {
    try {
      setIsLoading(true);

      const response = await axiosInstance.post(
        `${config.apis.stripe.base}/${config.apis.stripe.endpoints.createCheckoutSession}`,
        {
          amount,
        }
      );

      if (response.status === 201) {
        window.open(response.data.url, "_blank");
      }
    } catch (error) {
      handleSnackbar(
        "Error creating checkout session. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchWalletDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(
          `${config.apis.users.web.base}/${config.apis.users.web.endpoints.getWalletDetails}`
        );

        if (response.status === 200) {
          setWalletDetails(response.data);
          setUser((prevUser) => ({
            ...prevUser,
            wallet: response.data.balance,
          }));
        } else {
          handleSnackbar(
            "Error fetching wallet details. Please try again later."
          );
        }
      } catch (error) {
        handleSnackbar("Internal server error. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalletDetails();
  }, []);

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackbarMessage}
        action={action}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
      <div className={s.walletContainer}>
        <Navbar isColored={false} />
        <div className={s.walletWrapper}>
          <h1 className="titleFont">Top Up Your Wallet</h1>
          <p>Top up your wallet to start booking courses!</p>
          <div className={s.walletContent}>
            <div className={s.walletForm}>
              <div className={s.inputWrapper}>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder="Enter amount (USD)"
                  min={1}
                />
                <button onClick={handleTopUp}>Top Up Now</button>
              </div>
              <div className={s.walletInfo}>
                <div className={s.walletDetails}>
                  <h3>Wallet Balance</h3>
                  {walletDetails ? (
                    <p>
                      Your current wallet balance is: ${walletDetails.balance}
                    </p>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
                <div className={s.walletWarnings}>
                  <p>
                    Note: All transactions are secure and processed through
                    Stripe.
                  </p>
                  <p>For any issues, please contact support.</p>
                </div>
              </div>
            </div>
            <div className={s.walletHistory}>
              <h2>Transaction History</h2>
              {walletDetails ? (
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {walletDetails.transactions.map((transaction) => {
                      return (
                        <tr key={transaction.id}>
                          <td>{transaction.date}</td>
                          <td>${transaction.amount}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <p>Loading...</p>
              )}
              <p>For any discrepancies, please contact support.</p>
            </div>
          </div>
        </div>
      </div>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
