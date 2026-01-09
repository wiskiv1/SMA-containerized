"use client";
/**
 * @author Witse Panneels
 */
import type { Product } from "@/src/types/SMA_objects";
import type { productsResponse } from "@/src/types/SMA_networking";
import { useEffect, useState } from "react";

export default function GeneralSettings() {
  return (
    <table className="general-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
          <th>Save</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Interval</td>
          <td>60000</td>
          <td>[X]</td>
        </tr>
        <tr>
          <td>Interval</td>
          <td>60000</td>
          <td>[X]</td>
        </tr>
        <tr>
          <td>Interval</td>
          <td>60000</td>
          <td>[X]</td>
        </tr>
        <tr>
          <td>Interval</td>
          <td>60000</td>
          <td>[X]</td>
        </tr>
        <tr>
          <td>Interval</td>
          <td>60000</td>
          <td>[X]</td>
        </tr>
        <tr>
          <td>Interval</td>
          <td>60000</td>
          <td>[X]</td>
        </tr>
        <tr>
          <td>Interval</td>
          <td>60000</td>
          <td>[X]</td>
        </tr>
        <tr>
          <td>Interval</td>
          <td>60000</td>
          <td>[X]</td>
        </tr>
      </tbody>
    </table>
  );
}
