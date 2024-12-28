import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "@/states/hook";
import { verifyOtp } from "@/states/slices/authSlice";
import clsx from "clsx";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { email } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    if (!email) return;
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await dispatch(verifyOtp({ email, code: otp })).unwrap();
      navigate("/login"); // Navigate to the dashboard or a success page
    } catch (err: any) {
      setError(err.message || "Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={clsx(
        "flex items-center justify-center min-h-screen",
        "bg-gray-100 text-gray-900 dark:bg-black  dark:text-gray-100"
      )}
    >
      <Card className={clsx("w-full max-w-md", "bg-white dark:bg-black")}>
        <CardHeader>
          <CardTitle>Verify OTP</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to your phone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                // inputMode="numeric"
                // pattern="\\d{6}"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                className="w-full"
                // required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
