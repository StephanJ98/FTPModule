# FTPModule
***
Module designed for the calculation of cardiac parameters and to have the minimum of dependencies with other modules and to be as fast and light as possible.


<table>
  <tr>
    <th>Function</th>
    <th>Parameters</th>
    <th>Return</th>
  </tr>
  
  <tr>
    <td>
      <code>
        TheoricalMaxHeartRate
      </code>
    </td>
    <td>
      <code>
        age: Number
      </code>
      </br>
      <code>
        gender: {'m', 'f'}
      </code>
    </td>
    <td>
      <pre lang="javascript">
        Number
      </pre>
    </td>
  </tr>
  
 <tr>
    <td>
      <code>
        FTPZones
      </code>
    </td>
    <td>
      <code>
        age: Number
      </code>
      </br>
      <code>
        gender: {'m', 'f'}
      </code>
    </td>
    <td>
    <pre lang="javascript">
    {
        "zone1": Number,
        "zone2": Number,
        "zone3": Number,
        "zone4": Number,
        "zone5": Number,
        "zone6": Number,
        "zone7": Number,
    }
    </pre>
    </td>
  </tr>


  <tr>
    <td>
      <code>
        HeartRateExtractor
      </code>
    </td>
    <td>
      <code>
        file: File GPX from Strava
      </code>
    </td>
    <td>
    <pre lang="javascript">
      ['Number','Number','Number','Number','Number','Number',...]
    </pre>
    </td>
  </tr>
  
</table>
