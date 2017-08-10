from django import forms


class UploadExcelForm(forms.Form):
    email = forms.EmailField(max_length=100, required=True)
    scenarioName = forms.CharField(max_length=100, required=True)
    maxGateTime = forms.FloatField(required=True)
    intergateTime = forms.FloatField(required=True)
    filename = forms.CharField(max_length=200, required=True)
    incConst = forms.FloatField(required=True)
    maxSolveTime = forms.FloatField(required=True)
    towOn = forms.FloatField(required=True)
    towOff = forms.FloatField(required=True)
    resolution = forms.FloatField(required=True)
    makeGanttCharts = forms.BooleanField(required=False)
    colorByAircraft = forms.BooleanField(required=False)


class FlightPairingForm(forms.Form):
    email = forms.EmailField(max_length=100, required=True)
    scenarioName = forms.CharField(max_length=100, required=True)
    intergateTime = forms.FloatField(required=True)
    prefIncrement = forms.FloatField(required=True)
    maxSolveTime = forms.FloatField(required=True)
    hardMaxConstraint = forms.BooleanField(required=False)


class FlightGateForm(forms.Form):
    email = forms.EmailField(max_length=100, required=True)
    scenarioName = forms.CharField(max_length=100, required=True)
    prefIncrement = forms.FloatField(required=True)
    intergateTime = forms.FloatField(required=True)
    filename = forms.CharField(max_length=200, required=True)
    incConst = forms.FloatField(required=True)
    maxFlightSolveTime = forms.FloatField(required=True)
    maxGateSolveTime = forms.FloatField(required=True)
    resolution = forms.FloatField(required=True)
    hardMaxConstraint = forms.BooleanField(required=False)
