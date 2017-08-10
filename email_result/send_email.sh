#!/bin/bash

#set timer
start_date=`date +%m_%d_%y-%H:%M`
start_time=`date +%s`
echo "Starting Program at $start_date"

#Run python script
export PATH=/usr/local/bin:$PATH

cd /sfo/py_job/gate_allocation
virtualenv .
source ./bin/activate
export LD_LIBRARY_PATH=/sfo/coin/Cbc-2.9/lib
export COIN_INSTALL_DIR=/sfo/coin/Cbc-2.9
pip install -r requirements.txt
pip install -r dependent-requirements.txt

cd /sfo/py_job/gate_allocation/Python_gate_allocation
mkdir output
touch output/$start_date-results.log
python /sfo/py_job/gate_allocation/Python_gate_allocation/main2.py >> /sfo/py_job/gate_allocation/Python_gate_allocation/output/$start_date-results.log

end_time=`date +%s`
run_time=$((end_time-start_time))

#Send email
recipients="yueyilin.qi@flysfo.com, lawrence.ouyang@flysfo.com"
body="Hello, Your application 'Gate Allocation' has been completed. Please see the attachment to view the result."

cd /sfo/py_job/gate_allocation && tar -zcf /sfo/py_job/gate_allocation/output.tar.gz ./Python_gate_allocation/output
echo $body | mutt -a /sfo/py_job/gate_allocation/output.tar.gz -s "Gate Allocation Program Completed" -- $recipients
echo "Program took " $((run_time/86400))" days"\ $(date -d "1970-01-01 + $run_time seconds" "+%H hours %M minutes %S seconds")
exit 0