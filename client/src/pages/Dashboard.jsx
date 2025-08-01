import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';

export default function Dashboard() {
  const navigate = useNavigate();
  const [internData, setInternData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dummy data - in a real app, this would be from your backend
    const fetchData = async () => {
      try {
        // This would be replaced with actual API call:
        // const response = await axios.get('/api/interns/123');
        const dummyData = {
          name: "John Doe",
          referralCode: "johndoe2025",
          donationsRaised: 1250,
          rewards: ["Early Access", "Exclusive Badge", "Premium Content"]
        };
        setInternData(dummyData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Intern Dashboard</h1>
        <Button variant="outline" onClick={() => navigate('/leaderboard')}>
          View Leaderboard
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your intern information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">Name</p>
                <p className="font-medium">{internData.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Referral Code</p>
                <p className="font-mono font-medium">{internData.referralCode}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Donations Card */}
        <Card>
          <CardHeader>
            <CardTitle>Donations Raised</CardTitle>
            <CardDescription>Your contribution to the cause</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-4xl font-bold">${internData.donationsRaised}</p>
                <p className="text-sm text-gray-400">Total raised</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Progress to next milestone ($2000)</p>
                <Progress value={(internData.donationsRaised / 2000) * 100} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rewards Card */}
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Your Rewards</CardTitle>
            <CardDescription>Unlockables and achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {internData.rewards.map((reward, index) => (
                <div key={index} className="flex items-center p-3 border rounded-lg">
                  <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center mr-3">
                    <span className="text-xs">🎁</span>
                  </div>
                  <div>
                    <p className="font-medium">{reward}</p>
                    <p className="text-xs text-gray-400">Unlocked</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}