import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  LinearProgress,
  alpha,
  useTheme,
  Button,
  Tooltip,
  Paper
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  ShowChart as ChartIcon,
  Timeline as TimelineIcon,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon,
  DateRange as DateRangeIcon,
  Speed as SpeedIcon,
  Person as PersonIcon,
  LocalHospital as HospitalIcon,
  AttachMoney as RevenueIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { designTokens } from '../../styles/designTokens';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Treemap
} from 'recharts';

const AnalyticsInsightsCenter = () => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('engagement');
  const [isLoading, setIsLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null);

  // Mock data generation
  const generateMockData = () => {
    const engagementData = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      doctors: Math.floor(Math.random() * 50) + 100,
      reports: Math.floor(Math.random() * 30) + 50,
      engagement: Math.floor(Math.random() * 40) + 60,
      conversion: Math.floor(Math.random() * 20) + 10
    }));

    const specialtyDistribution = [
      { name: 'Cardiology', value: 35, doctors: 142 },
      { name: 'Neurology', value: 25, doctors: 98 },
      { name: 'Oncology', value: 20, doctors: 82 },
      { name: 'Orthopedics', value: 15, doctors: 61 },
      { name: 'Other', value: 5, doctors: 20 }
    ];

    const productPerformance = [
      { product: 'CardioFlow Pro', revenue: 450000, units: 45, growth: 23 },
      { product: 'NeuroSync 3000', revenue: 380000, units: 32, growth: 18 },
      { product: 'OrthoFlex', revenue: 290000, units: 58, growth: -5 },
      { product: 'DiagnosticPro', revenue: 520000, units: 26, growth: 35 },
      { product: 'OncoCare Suite', revenue: 410000, units: 41, growth: 12 }
    ];

    const conversionFunnel = [
      { stage: 'Prospects Identified', value: 1000, percentage: 100 },
      { stage: 'Reports Generated', value: 750, percentage: 75 },
      { stage: 'Meetings Scheduled', value: 300, percentage: 30 },
      { stage: 'Proposals Sent', value: 150, percentage: 15 },
      { stage: 'Deals Closed', value: 45, percentage: 4.5 }
    ];

    const geographicPerformance = [
      { region: 'Northeast', revenue: 820000, doctors: 215, growth: 18 },
      { region: 'Southeast', revenue: 690000, doctors: 178, growth: 22 },
      { region: 'Midwest', revenue: 540000, doctors: 142, growth: 8 },
      { region: 'West', revenue: 950000, doctors: 268, growth: 32 },
      { region: 'Southwest', revenue: 420000, doctors: 98, growth: -3 }
    ];

    const engagementMetrics = [
      { metric: 'Email Open Rate', value: 68, benchmark: 55 },
      { metric: 'Report Views', value: 85, benchmark: 70 },
      { metric: 'Follow-up Rate', value: 45, benchmark: 40 },
      { metric: 'Response Time', value: 92, benchmark: 80 },
      { metric: 'Satisfaction Score', value: 88, benchmark: 75 }
    ];

    return {
      engagementData,
      specialtyDistribution,
      productPerformance,
      conversionFunnel,
      geographicPerformance,
      engagementMetrics,
      summary: {
        totalDoctors: 803,
        totalRevenue: 3420000,
        avgEngagement: 78,
        conversionRate: 4.5,
        monthlyGrowth: 18
      }
    };
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setAnalyticsData(generateMockData());
      setIsLoading(false);
    }, 1000);
  }, [timeRange]);

  const MetricCard = ({ title, value, change, icon, color }) => (
    <Card
      sx={{
        borderRadius: designTokens.borderRadius.xl,
        backgroundColor: alpha(designTokens.colors.background.card, 0.6),
        backdropFilter: `blur(${designTokens.blur.md})`,
        border: `1px solid ${designTokens.colors.border.light}`,
        height: '100%',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {value}
            </Typography>
            {change && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                {change > 0 ? (
                  <TrendingUpIcon sx={{ fontSize: 20, color: designTokens.colors.success[500] }} />
                ) : (
                  <TrendingDownIcon sx={{ fontSize: 20, color: designTokens.colors.accent[500] }} />
                )}
                <Typography
                  variant="body2"
                  sx={{
                    color: change > 0 ? designTokens.colors.success[500] : designTokens.colors.accent[500],
                    fontWeight: 'medium',
                    ml: 0.5
                  }}
                >
                  {Math.abs(change)}%
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: designTokens.borderRadius.lg,
              backgroundColor: alpha(color || designTokens.colors.primary[500], 0.1),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: color || designTokens.colors.primary[500],
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const COLORS = [
    designTokens.colors.primary[500],
    designTokens.colors.accent[500],
    designTokens.colors.success[500],
    designTokens.colors.primary[400],
    designTokens.colors.accent[400]
  ];

  if (isLoading || !analyticsData) {
    return (
      <Box sx={{ p: 3 }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Analytics & Insights Center
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Real-time performance metrics and intelligence insights
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Time Range</InputLabel>
              <Select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                label="Time Range"
                sx={{ borderRadius: designTokens.borderRadius.lg }}
              >
                <MenuItem value="7d">Last 7 days</MenuItem>
                <MenuItem value="30d">Last 30 days</MenuItem>
                <MenuItem value="90d">Last 90 days</MenuItem>
                <MenuItem value="1y">Last year</MenuItem>
              </Select>
            </FormControl>
            <IconButton
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setAnalyticsData(generateMockData());
                  setIsLoading(false);
                }, 1000);
              }}
              sx={{
                backgroundColor: alpha(designTokens.colors.primary[500], 0.1),
                '&:hover': {
                  backgroundColor: alpha(designTokens.colors.primary[500], 0.2),
                }
              }}
            >
              <RefreshIcon />
            </IconButton>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              sx={{
                borderRadius: designTokens.borderRadius.lg,
                background: `linear-gradient(135deg, ${designTokens.colors.primary[500]} 0%, ${designTokens.colors.primary[600]} 100%)`,
              }}
            >
              Export Report
            </Button>
          </Box>
        </Box>

        {/* Summary Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={2.4}>
            <MetricCard
              title="Total Doctors"
              value={analyticsData.summary.totalDoctors.toLocaleString()}
              change={23}
              icon={<PersonIcon />}
              color={designTokens.colors.primary[500]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <MetricCard
              title="Total Revenue"
              value={`$${(analyticsData.summary.totalRevenue / 1000000).toFixed(2)}M`}
              change={analyticsData.summary.monthlyGrowth}
              icon={<RevenueIcon />}
              color={designTokens.colors.success[500]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <MetricCard
              title="Avg Engagement"
              value={`${analyticsData.summary.avgEngagement}%`}
              change={8}
              icon={<SpeedIcon />}
              color={designTokens.colors.accent[500]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <MetricCard
              title="Conversion Rate"
              value={`${analyticsData.summary.conversionRate}%`}
              change={-2}
              icon={<ChartIcon />}
              color={designTokens.colors.primary[400]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <MetricCard
              title="Active Campaigns"
              value="156"
              change={15}
              icon={<TimelineIcon />}
              color={designTokens.colors.accent[400]}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Main Charts */}
      <Grid container spacing={3}>
        {/* Engagement Trends */}
        <Grid item xs={12} lg={8}>
          <Card
            sx={{
              borderRadius: designTokens.borderRadius.xl,
              backgroundColor: alpha(designTokens.colors.background.card, 0.6),
              backdropFilter: `blur(${designTokens.blur.md})`,
              border: `1px solid ${designTokens.colors.border.light}`,
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  Engagement Trends
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {['doctors', 'reports', 'engagement'].map((metric) => (
                    <Chip
                      key={metric}
                      label={metric.charAt(0).toUpperCase() + metric.slice(1)}
                      onClick={() => setSelectedMetric(metric)}
                      sx={{
                        backgroundColor: selectedMetric === metric
                          ? alpha(designTokens.colors.primary[500], 0.2)
                          : alpha(designTokens.colors.background.card, 0.8),
                        borderColor: selectedMetric === metric
                          ? designTokens.colors.primary[500]
                          : designTokens.colors.border.light,
                        cursor: 'pointer',
                      }}
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analyticsData.engagementData}>
                  <defs>
                    <linearGradient id="colorDoctors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={designTokens.colors.primary[500]} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={designTokens.colors.primary[500]} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={designTokens.colors.accent[500]} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={designTokens.colors.accent[500]} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={designTokens.colors.success[500]} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={designTokens.colors.success[500]} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={alpha(designTokens.colors.text.primary, 0.1)} />
                  <XAxis 
                    dataKey="date" 
                    stroke={designTokens.colors.text.secondary}
                    style={{ fontSize: 12 }}
                  />
                  <YAxis 
                    stroke={designTokens.colors.text.secondary}
                    style={{ fontSize: 12 }}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: alpha(designTokens.colors.background.secondary, 0.95),
                      border: `1px solid ${designTokens.colors.border.light}`,
                      borderRadius: designTokens.borderRadius.lg,
                    }}
                  />
                  {selectedMetric === 'doctors' && (
                    <Area
                      type="monotone"
                      dataKey="doctors"
                      stroke={designTokens.colors.primary[500]}
                      fillOpacity={1}
                      fill="url(#colorDoctors)"
                    />
                  )}
                  {selectedMetric === 'reports' && (
                    <Area
                      type="monotone"
                      dataKey="reports"
                      stroke={designTokens.colors.accent[500]}
                      fillOpacity={1}
                      fill="url(#colorReports)"
                    />
                  )}
                  {selectedMetric === 'engagement' && (
                    <Area
                      type="monotone"
                      dataKey="engagement"
                      stroke={designTokens.colors.success[500]}
                      fillOpacity={1}
                      fill="url(#colorEngagement)"
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Specialty Distribution */}
        <Grid item xs={12} lg={4}>
          <Card
            sx={{
              borderRadius: designTokens.borderRadius.xl,
              backgroundColor: alpha(designTokens.colors.background.card, 0.6),
              backdropFilter: `blur(${designTokens.blur.md})`,
              border: `1px solid ${designTokens.colors.border.light}`,
              height: '100%',
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Specialty Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analyticsData.specialtyDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analyticsData.specialtyDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: alpha(designTokens.colors.background.secondary, 0.95),
                      border: `1px solid ${designTokens.colors.border.light}`,
                      borderRadius: designTokens.borderRadius.lg,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <Box sx={{ mt: 2 }}>
                {analyticsData.specialtyDistribution.map((item, index) => (
                  <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                      <Typography variant="body2">{item.name}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {item.doctors} doctors
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Product Performance */}
        <Grid item xs={12} lg={6}>
          <Card
            sx={{
              borderRadius: designTokens.borderRadius.xl,
              backgroundColor: alpha(designTokens.colors.background.card, 0.6),
              backdropFilter: `blur(${designTokens.blur.md})`,
              border: `1px solid ${designTokens.colors.border.light}`,
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Product Performance
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.productPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke={alpha(designTokens.colors.text.primary, 0.1)} />
                  <XAxis 
                    dataKey="product" 
                    stroke={designTokens.colors.text.secondary}
                    style={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    stroke={designTokens.colors.text.secondary}
                    style={{ fontSize: 12 }}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: alpha(designTokens.colors.background.secondary, 0.95),
                      border: `1px solid ${designTokens.colors.border.light}`,
                      borderRadius: designTokens.borderRadius.lg,
                    }}
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill={designTokens.colors.primary[500]}
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Conversion Funnel */}
        <Grid item xs={12} lg={6}>
          <Card
            sx={{
              borderRadius: designTokens.borderRadius.xl,
              backgroundColor: alpha(designTokens.colors.background.card, 0.6),
              backdropFilter: `blur(${designTokens.blur.md})`,
              border: `1px solid ${designTokens.colors.border.light}`,
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Sales Conversion Funnel
              </Typography>
              <Box sx={{ mt: 3 }}>
                {analyticsData.conversionFunnel.map((stage, index) => (
                  <Box key={stage.stage} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" fontWeight="medium">
                        {stage.stage}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          {stage.value.toLocaleString()}
                        </Typography>
                        <Chip
                          label={`${stage.percentage}%`}
                          size="small"
                          sx={{
                            backgroundColor: alpha(designTokens.colors.primary[500], 0.1),
                            color: designTokens.colors.primary[300],
                          }}
                        />
                      </Box>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={stage.percentage}
                      sx={{
                        height: 8,
                        borderRadius: designTokens.borderRadius.full,
                        backgroundColor: alpha(designTokens.colors.primary[500], 0.1),
                        '& .MuiLinearProgress-bar': {
                          borderRadius: designTokens.borderRadius.full,
                          backgroundColor: COLORS[index % COLORS.length],
                        }
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Geographic Performance */}
        <Grid item xs={12}>
          <Card
            sx={{
              borderRadius: designTokens.borderRadius.xl,
              backgroundColor: alpha(designTokens.colors.background.card, 0.6),
              backdropFilter: `blur(${designTokens.blur.md})`,
              border: `1px solid ${designTokens.colors.border.light}`,
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Geographic Performance
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={analyticsData.engagementMetrics}>
                  <PolarGrid stroke={alpha(designTokens.colors.text.primary, 0.1)} />
                  <PolarAngleAxis 
                    dataKey="metric" 
                    stroke={designTokens.colors.text.secondary}
                    style={{ fontSize: 12 }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]}
                    stroke={designTokens.colors.text.secondary}
                    style={{ fontSize: 12 }}
                  />
                  <Radar 
                    name="Current Performance" 
                    dataKey="value" 
                    stroke={designTokens.colors.primary[500]} 
                    fill={designTokens.colors.primary[500]} 
                    fillOpacity={0.6} 
                  />
                  <Radar 
                    name="Industry Benchmark" 
                    dataKey="benchmark" 
                    stroke={designTokens.colors.accent[500]} 
                    fill={designTokens.colors.accent[500]} 
                    fillOpacity={0.3} 
                  />
                  <Legend />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: alpha(designTokens.colors.background.secondary, 0.95),
                      border: `1px solid ${designTokens.colors.border.light}`,
                      borderRadius: designTokens.borderRadius.lg,
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsInsightsCenter;