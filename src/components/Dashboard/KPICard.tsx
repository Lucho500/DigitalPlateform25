import React from 'react';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { KPI } from '../../types';

interface KPICardProps {
  kpi: KPI;
}

export const KPICard: React.FC<KPICardProps> = ({ kpi }) => {
  const formatValue = (value: number) => {
    return new Intl.NumberFormat('fr-FR').format(value);
  };

  const formatChange = (change: number) => {
    const prefix = change > 0 ? '+' : '';
    return `${prefix}${change.toFixed(1)}%`;
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardContent className="p-6">
        <h3 className="text-base font-medium text-gray-500 dark:text-gray-400">{kpi.title}</h3>
        <div className="mt-2 flex items-baseline">
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            {formatValue(kpi.value)}{kpi.unit}
          </p>
          <p 
            className={`ml-2 flex items-center text-sm font-medium ${
              kpi.trend === 'up'
                ? 'text-green-600 dark:text-green-500'
                : kpi.trend === 'down'
                ? 'text-red-600 dark:text-red-500'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {kpi.trend === 'up' ? (
              <ArrowUpIcon className="mr-0.5 h-4 w-4 flex-shrink-0 self-center" />
            ) : kpi.trend === 'down' ? (
              <ArrowDownIcon className="mr-0.5 h-4 w-4 flex-shrink-0 self-center" />
            ) : null}
            {formatChange(kpi.change)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};