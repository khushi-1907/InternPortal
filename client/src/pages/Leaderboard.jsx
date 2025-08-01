import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

export default function Leaderboard() {
  const navigate = useNavigate();
  
  // Dummy leaderboard data
  const leaderboardData = [
    { rank: 1, name: "Alex Johnson", amount: 3200 },
    { rank: 2, name: "Sam Wilson", amount: 2850 },
    { rank: 3, name: "Taylor Smith", amount: 2750 },
    { rank: 4, name: "Jordan Lee", amount: 2500 },
    { rank: 5, name: "Casey Kim", amount: 2300 },
    { rank: 6, name: "Riley Jones", amount: 2100 },
    { rank: 7, name: "Jamie Miller", amount: 1950 },
    { rank: 8, name: "Morgan Brown", amount: 1800 },
    { rank: 9, name: "Drew Garcia", amount: 1650 },
    { rank: 10, name: "Pat Williams", amount: 1500 },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <Button variant="outline" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Interns</CardTitle>
          <CardDescription>Ranked by donations raised</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Top performing interns this month</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Amount Raised</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((item) => (
                <TableRow key={item.rank}>
                  <TableCell>{item.rank}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-right">${item.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}