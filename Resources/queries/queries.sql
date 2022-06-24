select 
  employee.id AS employee_id, 
  first_name,
  last_name,
  sum(hours)*hourly_rate AS hourly, 
  sum(miles)*0.52 AS miles
from users
  join employee 
    on employee.email_id = users.email_id
  left join timesheet_entry
    on employee.id = timesheet_entry.emp_id
where(employee.id = 1 AND date >= '2022-06-15' AND date <= '2022-06-20')
group by (employee.id, first_name, last_name)


select 
bonus_item.name, 
date, 
item_entry.pickup, 
item_entry.wet_unit,
item_entry.num_emps,
timesheet_entry.emp_id,
coalesce(
(case when pickup AND wet_unit IS NOT TRUE then rates.pickup_rate_dry end),
(case when pickup AND wet_unit then pickup_rate_wet end),
(case when pickup IS NOT TRUE AND wet_unit IS NOT TRUE then del_rate_wet end),
(case when pickup IS NOT TRUE AND wet_unit then del_rate_dry end)) as rate
from timesheet_entry
    join item_entry
      on item_entry.entry_id = timesheet_entry.id
    join bonus_item
      on bonus_item.id = item_entry.item_id
    join rates
      on rates.item_id = bonus_item.id
  where(date >= '2022-06-15' AND date <= '2022-06-18')




select 
timesheet_entry.emp_id,
sum(coalesce(
(case when pickup AND wet_unit IS NOT TRUE then rates.pickup_rate_dry end),
(case when pickup AND wet_unit then pickup_rate_wet end),
(case when pickup IS NOT TRUE AND wet_unit IS NOT TRUE then del_rate_wet end),
(case when pickup IS NOT TRUE AND wet_unit then del_rate_dry end))) as earned
from timesheet_entry
    join item_entry
      on item_entry.entry_id = timesheet_entry.id
    join bonus_item
      on bonus_item.id = item_entry.item_id
    join rates
      on rates.item_id = bonus_item.id
  where(date >= '2022-06-15' AND date <= '2022-06-20')
group by(timesheet_entry.emp_id)
having(timesheet_entry.emp_id = 1)